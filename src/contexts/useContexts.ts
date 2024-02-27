import { useContext } from "react";
import { AuthContext } from "./authContext";
import { CarsContext } from "./carsContext";

export function useContexts() {
  const authContext = useContext(AuthContext)
  const carsContext = useContext(CarsContext)

  return { ...authContext, ...carsContext }
}