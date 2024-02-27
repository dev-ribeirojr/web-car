import { Timestamp } from "firebase/firestore";

interface FilesCarProps {
  name: string,
  url: string
  uid: string
}

export type ListFilesCarProps = FilesCarProps[]

export interface CarsProps {
  uid: string,
  name: string,
  model: string,
  whatsapp: string,
  city: string,
  year: string,
  km: string,
  price: string | number,
  description: string,
  created: Timestamp | Date,
  owner: string,
  userUid: string,
  images: FilesCarProps[],
  deleted: boolean
}

export type ListCarsProps = CarsProps[]