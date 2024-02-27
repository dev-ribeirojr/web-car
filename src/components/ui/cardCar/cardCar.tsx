import { Loading } from "..";
import { icons } from "../../../assets/icons";
import { useContexts } from "../../../contexts/useContexts";
import { CarsProps } from "../../interfaces";
import { useCar } from "./useCar";

interface CardCarProps {
  car: CarsProps
  deleted?: boolean
}

export function CardCar({ car, deleted }: CardCarProps) {

  const { loadImages, handleImageLoad } = useCar()
  const { handleDeletedCar } = useContexts()

  return (
    <div className="w-full bg-white rounded-lg relative" >

      {deleted && (
        <button
          onClick={() => handleDeletedCar(car.uid)}
          className="absolute bg-white w-12 h-12 rounded-full flex items-center justify-center right-2 top-2 drop-shadow text-2xl  hover:bg-slate-300 transition-all" >
          {icons.trash}
        </button>
      )}

      <div className="w-full h-72 rounded-lg bg-slate-200 flex items-center justify-center"
        style={{ display: loadImages.includes(car.uid) ? "none" : "block" }}
      >
        <Loading />
      </div>

      <img
        src={car?.images[0]?.url}
        alt="Imagen do veiculo"
        className="w-full rounded-lg mb-2 max-h-72 object-cover "
        onLoad={() => handleImageLoad(car.uid)}
        style={{ display: loadImages.includes(car.uid) ? "block" : "none" }}
      />

      <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

      <div className="flex flex-col px-2" >
        <span className="text-zinc-700 mb-4">Ano: {car.year}</span>
        <strong className="text-black font-medium text-xl">R$ {car.price}</strong>
      </div>
      <div className="w-full h-px bg-slate-200 my-2" />

      <div className="px-2 pb-2">
        <span className="text-zinc-700">{car.city}</span>
      </div>
    </div>
  )
}