import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../../../../services/firebase";
import { useNavigate } from "react-router-dom";
import { useContexts } from "../../../../contexts/useContexts";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Insira um email válido").nonempty("campo obrigatório"),
  password: z.string().nonempty("campo obrigatório")
})

type FormData = z.infer<typeof schema>

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { handleSubmit, reset, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })
  const { handleDataUser } = useContexts()


  async function sendForm(data: FormData) {
    setLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth, data.email, data.password)

      handleDataUser({
        name: response.user.displayName,
        email: data.email,
        uid: response.user.uid
      })

      navigate("/", { replace: true })
    } catch (error) {
      toast.error("Error ao logar usuário")
    }
    setLoading(false)
  }



  return { sendForm, handleSubmit, reset, register, errors, loading }

}