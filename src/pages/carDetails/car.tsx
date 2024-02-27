import { icons } from "../../assets/icons"
import { Container } from "../../components/ui"
import { useCarDetails } from "./useCarDetails"

import { Swiper, SwiperSlide } from 'swiper/react'

export function CarDetails() {

  const { car, slidePerview } = useCarDetails()

  return (
    <Container>
      <Swiper
        slidesPerView={slidePerview}
        navigation
        pagination={{ clickable: true }}
      >
        {car?.images?.map((img) => (
          <SwiperSlide key={img.uid} className="w-full">
            <img
              src={img.url}
              className="w-full h-96 object-cover"
            />

          </SwiperSlide>
        ))}

      </Swiper>

      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-2 items-center justify-between">
            <h1 className="font-bold text-2xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-2xl text-black">R$ {car?.price}</h1>
          </div>
          <p>{car?.model}</p>

          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <strong>Cidade</strong>
                <p>{car?.city}</p>
              </div>
              <div>
                <strong>Ano</strong>
                <p>{car?.year}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <strong>KM</strong>
                <p>{car?.km}</p>
              </div>
            </div>
          </div>

          <strong>Descrição:</strong>
          <p className="mb-4">{car?.description}</p>

          <strong>Telefone / WhatsApp</strong>
          <p>{car?.whatsapp}</p>

          <a
            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"
            href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá vi esse veículo no anúncio no site webCar e estou interessado!`}
            target="_blanck"
          >
            Falar com Vendedor
            {icons.whatsapp}
          </a>

        </main>
      )}
    </Container>
  )
}
