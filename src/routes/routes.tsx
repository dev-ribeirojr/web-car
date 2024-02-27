import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout/layout";
import { Auth, CarDetails, Dashboard, Home, NewCar } from "../pages";
import { Private } from "./private";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/car/:id",
        element: <CarDetails />
      },
      {
        path: "/dashboard",
        element: <Private><Dashboard /></Private>
      },
      {
        path: "/newCar",
        element: <Private><NewCar /></Private>
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />
  }
])