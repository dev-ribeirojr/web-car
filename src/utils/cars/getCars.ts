import { getDocs, orderBy, query, where } from "firebase/firestore"
import { collectionCars } from "../../services/firebase"
import { CarsProps, ListCarsProps } from "../../components/interfaces"
import toast from "react-hot-toast"

interface GetListCarsProps {
  type: "myCars" | "allCars",
  userUid?: string
}

export async function getListCars({ type, userUid }: GetListCarsProps) {

  try {
    let queryRef = query(collectionCars, orderBy("created", "desc"), where("deleted", "==", false))

    if (type === "myCars" && userUid) {
      queryRef = query(queryRef, where("userUid", "==", userUid));
    }

    const response = await getDocs(queryRef)
    const listCars = [] as ListCarsProps

    response.forEach((doc) => {
      const data = doc.data()

      listCars.push({ uid: doc.id, ...data } as CarsProps)
    })

    return listCars

  } catch (error) {
    toast.error("Error ao buscar carros")
    return []
  }

}