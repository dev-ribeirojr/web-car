import { useEffect } from "react";
import { CardCar, Container, PanelHeader } from "../../components/ui";
import { useContexts } from "../../contexts/useContexts";

export function Dashboard() {

  const { myCars, getMyCars } = useContexts()

  useEffect(() => {
    if (myCars.length === 0) {
      getMyCars()
    }
  }, [])

  return (
    <Container>
      <PanelHeader />

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Meus carros
      </h1>
      {myCars.length === 0 && <p className="w-full text-center" >Nenhum resultado</p>}

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myCars.map((car) => (
          <CardCar key={car.uid} car={car} deleted />
        ))}
      </main>

    </Container>
  )
}
