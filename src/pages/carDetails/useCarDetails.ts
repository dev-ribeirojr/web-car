import { useEffect, useState } from "react";
import { CarsProps } from "../../components/interfaces";
import { useContexts } from "../../contexts/useContexts";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { collectionCars } from "../../services/firebase";

export function useCarDetails() {

  const [car, setCar] = useState<CarsProps | null>(null)
  const [slidePerview, setSlidePerview] = useState<number>(2)

  const { id } = useParams()
  const { cars, myCars } = useContexts()
  const navigate = useNavigate()

  useEffect(() => {

    function handleResize() {
      const width = window.innerWidth
      setSlidePerview(width < 720 ? 1 : 2)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    async function filterCarSelected() {

      const carSelected = cars.filter((car) => car.uid === id) || myCars.filter((car) => car.uid === id)

      if (carSelected.length === 0) {

        const docRef = doc(collectionCars, id)

        const response = await getDoc(docRef)
        const data = response.data()

        if (data) {
          setCar({ uid: response.id, ...data } as CarsProps)
        }
      } else {
        if (carSelected.length > 0) {

          setCar(carSelected[0])
        } else {
          navigate("/")
        }
      }
    }
    filterCarSelected()
  }, [id])


  return { car, slidePerview }

}