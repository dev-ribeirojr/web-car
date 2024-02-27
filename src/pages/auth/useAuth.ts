import { useState } from "react"

export function useAuth() {

  const [login, setLogin] = useState<boolean>(true)

  function handleRegisterOrLogin() {
    setLogin(!login)
  }

  return { login, handleRegisterOrLogin }
}