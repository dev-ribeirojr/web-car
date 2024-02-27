import { useEffect, useState } from "react"
import { useContexts } from "../../contexts/useContexts"

export function useHome() {

  const { getCars, cars } = useContexts()
  const [nameCar, setNameCar] = useState<string>("")

  useEffect(() => {
    if (cars.length === 0) {
      getCars()
    }
  }, [])

  const filterCar = cars.filter((car) => car.name.toUpperCase().includes(nameCar.toUpperCase()))

  return { filterCar, nameCar, setNameCar }
}