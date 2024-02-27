import { useState } from "react"
export function useCar() {
  const [loadImages, setLoadImages] = useState<string[]>([])

  function handleImageLoad(uid: string) {
    setLoadImages((prevImage) => [...prevImage, uid])
  }

  return { handleImageLoad, loadImages }
}