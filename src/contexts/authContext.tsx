import { onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import toast from "react-hot-toast";

type AuthContextData = {
  signed: boolean
  loadingAuth: boolean
  handleDataUser: (data: UserProps) => void
  user: UserProps | null
  handleLogOut: () => Promise<void>
}

interface UserProps {
  uid: string
  name: string | null
  email: string | null
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<UserProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {

        handleDataUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email
        })


      } else {
        setUser(null)
      }
      setLoadingAuth(false)
    })

    return () => {
      unsub();
    }
  }, [])

  function handleDataUser({ name, email, uid }: UserProps) {
    setUser({
      uid,
      name,
      email,
    })
  }

  async function handleLogOut() {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      toast.error("Erro ao deslogar usuário")
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, loadingAuth, handleDataUser, user, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  )
}