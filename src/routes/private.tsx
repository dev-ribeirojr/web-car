import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useContexts } from "../contexts/useContexts";

export function Private({ children }: { children: ReactNode }) {

  const { signed, loadingAuth } = useContexts()

  if (loadingAuth) return <></>

  return !signed ? <Navigate to="/auth" /> : children
}