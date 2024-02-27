import { Button, Input } from "../../../../components/ui";
import { useLogin } from "./useLogin";

export function Login() {

  const { sendForm, handleSubmit, register, errors, loading } = useLogin()

  return (
    <form
      onSubmit={handleSubmit(sendForm)}
      className="bg-white max-w-xl w-full rounded-lg p-4">
      <Input
        type="email"
        name="email"
        placeholder="Digite seu email"
        register={register}
        error={errors.email?.message}
      />
      <Input
        type="password"
        name="password"
        placeholder="Digite sua senha"
        register={register}
        error={errors.password?.message}
      />
      <Button loading={loading}>Acessar</Button>
    </form>
  )
}