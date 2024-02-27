import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { auth } from "../../../../services/firebase"
import { useNavigate } from "react-router-dom"
import { useContexts } from "../../../../contexts/useContexts"
import toast from "react-hot-toast"
import { useState } from "react"

const schema = z.object({
  name: z.string().nonempty("campo obrigatório"),
  email: z.string().email("informe um email válido").nonempty("campo obrigatório"),
  password: z.string().min(6, "a senha tem que ter pelo menos 6 digitos").nonempty("campo obrigatório")
})

type FormData = z.infer<typeof schema>
export function useRegister() {

  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })
  const { handleDataUser } = useContexts()

  async function sendForm(data: FormData) {
    setLoading(true)
    try {
      const newAccount = await createUserWithEmailAndPassword(auth, data.email, data.password)

      await updateProfile(newAccount.user, {
        displayName: data.name
      })

      handleDataUser({
        name: data.name,
        email: data.email,
        uid: newAccount.user.uid
      })

      navigate("/", { replace: true })

    } catch (error) {
      toast.error("Erro ao cadastrar usuário")
    }
    setLoading(false)
  }

  return { handleSubmit, register, errors, sendForm, loading }
}