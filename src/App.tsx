import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes'
import { AuthProvider } from './contexts/authContext'
import { CarsProvider } from './contexts/carsContext'

import { register } from 'swiper/element/bundle'

register()
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthProvider>
      <CarsProvider>
        <Toaster
          position='top-right'
          reverseOrder={false}
        />
        <RouterProvider router={routes} />
      </CarsProvider>
    </AuthProvider>
  )
}

export default App
