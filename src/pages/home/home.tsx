import { Link } from "react-router-dom";
import { CardCar, Container, PanelHeader } from "../../components/ui";
import { useHome } from "./useHome";
import { icons } from "../../assets/icons";

export function Home() {

  const { filterCar, nameCar, setNameCar } = useHome()

  return (
    <Container>
      <PanelHeader />
      <div className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2 mt-4">
        <input
          placeholder="Digite o modelo do carro..."
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          value={nameCar}
          onChange={(e) => setNameCar(e.target.value)}
        />
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
        >{icons.search}</button>
      </div>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>

      {filterCar.length === 0 && <p className="w-full text-center" >Nenhum resultado</p>}

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filterCar.map((car) => (
          <Link to={`/car/${car.uid}`} key={car.uid}
            className="hover:scale-105 transition"
          >
            <CardCar car={car} />
          </Link>
        ))}
      </main>
    </Container>
  )
}
