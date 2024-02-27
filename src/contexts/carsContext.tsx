import { ReactNode, createContext, useState } from "react";
import { CarsProps, ListCarsProps } from "../components/interfaces";
import { getListCars } from "../utils";
import { useContexts } from "./useContexts";
import { doc, updateDoc } from "firebase/firestore";
import { collectionCars } from "../services/firebase";
import toast from "react-hot-toast";

type CarsContextProps = {
  cars: ListCarsProps
  getCars: () => Promise<void>
  getMyCars: () => Promise<void>
  myCars: ListCarsProps
  handleDeletedCar: (uid: string) => Promise<void>
  handleNewCar: (car: CarsProps) => void
}
export const CarsContext = createContext({} as CarsContextProps)

export function CarsProvider({ children }: { children: ReactNode }) {

  const { user } = useContexts()

  const [cars, setCars] = useState<ListCarsProps>([])
  const [myCars, setMyCars] = useState<ListCarsProps>([])

  async function getCars() {
    const response = await getListCars({ type: "allCars" })

    if (response.length > 0) {
      setCars(response)
    }
  }

  async function getMyCars() {
    const response = await getListCars({ type: "myCars", userUid: user?.uid })

    if (response.length > 0) {
      setMyCars(response)
    }
  }

  async function handleDeletedCar(uid: string) {
    try {

      const docRef = doc(collectionCars, uid)

      await updateDoc(docRef, { deleted: true })

      const updateCars = cars.filter((car) => car.uid !== uid)
      const updateMyCars = cars.filter((car) => car.uid !== uid)

      setCars(updateCars)
      setMyCars(updateMyCars)

      toast.success("Veículo excluído!")
    } catch (error) {
      toast.error("Error ao excluír veículo!")
    }
  }

  function handleNewCar(car: CarsProps) {
    setCars((cars) => [...cars, car])
    setMyCars((cars) => [...cars, car])
  }


  return (
    <CarsContext.Provider value={{ cars, getCars, getMyCars, myCars, handleDeletedCar, handleNewCar }}>
      {children}
    </CarsContext.Provider>
  )
}