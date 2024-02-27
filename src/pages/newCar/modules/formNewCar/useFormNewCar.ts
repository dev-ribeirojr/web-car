import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContexts } from "../../../../contexts/useContexts";

import { v4 as uuidV4 } from 'uuid'
import { collectionCars, storage } from "../../../../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc } from "firebase/firestore";
import { CarsProps, ListFilesCarProps } from "../../../../components/interfaces";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("campo obrigatório"),
  model: z.string().nonempty("campo obrigatório"),
  year: z.string().nonempty("campo obrigatório"),
  km: z.string().nonempty("campo obrigatório"),
  price: z.string().nonempty("campo obrigatório"),
  city: z.string().nonempty("campo obrigatório"),
  whatsapp: z.string().min(1, "").refine((value) => /^(\d{11,12})$/.test(value), {
    message: "telefone inválido"
  }),
  description: z.string().nonempty("campo obrigatório"),

})

type DataFormProps = z.infer<typeof schema>

interface ObjectFileUrlProps {
  url: string,
  name: string
}

export function useFormNewCar() {

  const { handleSubmit, register, formState: { errors }, reset } = useForm<DataFormProps>({
    resolver: zodResolver(schema)
  })
  const { user, handleNewCar } = useContexts()

  const [filesList, setFilesList] = useState<File[]>([])
  const [filesPrev, setFilesPrev] = useState<ObjectFileUrlProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function sendForm(data: DataFormProps) {

    if (filesList.length === 0 || filesPrev.length === 0) {
      toast.error("Envie algumas imagens do veículo para cadastrar!")
      return
    }
    setLoading(true)
    try {
      const urls = await handleUploadImg(filesList)

      if (urls?.length === 0) {
        toast.error("Ops erro ao enviar imagens, veículo não cadastrado")
        return
      }

      const newCar = {
        name: data.name.toUpperCase(),
        model: data.model,
        whatsapp: data.whatsapp,
        city: data.city,
        year: data.year,
        km: data.km,
        price: data.price,
        description: data.description,
        created: new Date(),
        owner: user?.name,
        userUid: user?.uid,
        images: urls,
        deleted: false
      }

      const response = await addDoc(collectionCars, newCar)


      handleNewCar({ uid: response.id, ...newCar } as CarsProps)

      toast.success("Veículo cadastrado com sucesso!")

      setFilesList([])
      setFilesPrev([])
      reset()

    } catch (error) {
      toast.error("Erro ao cadastrar veículo!")
    }
    setLoading(false)
  }

  async function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[]
      setFilesList(files as File[])

      const urls: ObjectFileUrlProps[] = [];

      for (const file of files) {
        const objectFileUrl = {
          url: URL.createObjectURL(file),
          name: file.name
        }
        urls.push(objectFileUrl)
      }
      setFilesPrev(urls)
    }
  }

  function handleRemoveFile(file: ObjectFileUrlProps) {
    if (filesList) {
      setFilesList(filesList.filter((currentFile) => currentFile.name !== file.name))
      setFilesPrev(filesPrev.filter((currentFile) => currentFile.name !== file.name))
      toast.success("Arquivo removido!")
    }
  }

  async function handleUploadImg(images: File[]) {
    if (!user?.uid) return
    const userUid = user?.uid;

    const urls: ListFilesCarProps = []

    try {

      for (const image of images) {
        const idImage = uuidV4()
        const uploadRef = ref(storage, `images/${userUid}/${idImage}`)

        const upload = await uploadBytes(uploadRef, image)
        const download = await getDownloadURL(upload.ref)

        urls.push({
          name: image.name,
          uid: idImage,
          url: download
        })
      }

      return urls
    } catch (error) {
      return []
    }
  }
  return { handleSubmit, register, errors, sendForm, handleChangeFile, filesPrev, handleRemoveFile, loading }

}