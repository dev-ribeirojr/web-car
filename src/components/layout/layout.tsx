import { Outlet } from "react-router-dom";
import { Header } from "./modules";

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}