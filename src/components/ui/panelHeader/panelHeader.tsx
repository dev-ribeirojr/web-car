import { Link } from "react-router-dom";
import { useContexts } from "../../../contexts/useContexts";


export function PanelHeader() {

  const { handleLogOut, user } = useContexts()

  return (
    <div
      className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4"
    >
      <Link to="/">Home</Link>
      {!!user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/newCar">Novo carro</Link>
          <button onClick={handleLogOut} className="ml-auto">
            Sair da conta
          </button>
        </>
      ) : (
        <Link to="/auth">Login</Link>
      )}
    </div>
  )
}