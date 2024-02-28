import { useState } from "react"
import { useContexts } from "../../contexts/useContexts"

export function useAuth() {

  const [login, setLogin] = useState<boolean>(true)
  const { handleLogOut, clearListCars } = useContexts()

  function handleRegisterOrLogin() {
    setLogin(!login)
  }

  async function logOut() {
    try {
      await handleLogOut()
      clearListCars()
    } catch (error) {

    }
  }

  return { login, handleRegisterOrLogin, logOut }
}