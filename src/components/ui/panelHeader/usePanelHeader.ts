import { useContexts } from "../../../contexts/useContexts"

export function usePanelHeader() {
  const { handleLogOut, clearListCars } = useContexts()

  async function logOut() {
    try {
      await handleLogOut()
      clearListCars()
    } catch (error) {

    }
  }

  return { logOut }
}