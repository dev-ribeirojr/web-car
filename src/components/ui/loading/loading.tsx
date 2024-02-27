import { icons } from "../../../assets/icons";

export function Loading() {
  return (
    <span className=" w-full h-full flex items-center justify-center text-2xl animate-spin">{icons.loading}</span>
  )
}