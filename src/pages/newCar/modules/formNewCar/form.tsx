import { icons } from "../../../../assets/icons";
import { Button, Input, TextArea } from "../../../../components/ui";
import { useFormNewCar } from "./useFormNewCar";

export function FormNewCar() {

  const { handleSubmit, sendForm, errors, register, handleChangeFile, filesPrev, handleRemoveFile, loading } = useFormNewCar()

  return (
    <>
      <div className="w-full bg-white p-3 mt-4 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 rounded-lg w-48 flex items-center justify-center cursor-pointer border-gray-600 h-32">
          <div className="absolute cursor-pointer">
            <span className="text-black text-3xl">{icons.upload}</span>
          </div>
          <div className="cursor-pointer">
            <input
              onChange={handleChangeFile}
              className="opacity-0 w-48 h-32 cursor-pointer"
              type="file"
              accept="image/jpeg, image/png"
              multiple
            />
          </div>
        </button>
        {filesPrev.map((file, index) => (
          <div key={index}
            className="border-2 rounded-lg w-48 flex items-center justify-center h-32 relative"
          >
            <img
              src={file.url}
              alt={`Imagen nº ${index + 1} selecionada`}
              className="h-32 w-full object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemoveFile(file)}
              className="absolute h-32 w-full rounded-lg flex justify-center items-center text-3xl text-red-500"
            >
              {icons.trash}
            </button>
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2" >
        <form className="w-full" onSubmit={handleSubmit(sendForm)} >

          <Input
            register={register}
            name="name"
            error={errors.name?.message}
            placeholder="Ex: Onix 1.0"
            label="Nome do carro"
          />
          <Input
            register={register}
            name="model"
            error={errors.model?.message}
            placeholder="Ex: 1.0 flex manual"
            label="Modelo do carro"
          />
          <div className="flex w-full items-center gap-4">
            <Input
              register={register}
              name="year"
              error={errors.year?.message}
              placeholder="Ex: 2016/2016"
              label="Ano"
            />
            <Input
              register={register}
              name="km"
              error={errors.km?.message}
              placeholder="Ex: 23.900"
              label="KM"
            />
          </div>
          <div className="flex w-full items-center gap-4">
            <Input
              register={register}
              name="whatsapp"
              error={errors.whatsapp?.message}
              placeholder="Ex: 011 99999999"
              label="WhatsApp"
            />
            <Input
              register={register}
              name="city"
              error={errors.city?.message}
              placeholder="Ex: São Paulo"
              label="Cidade"
            />
          </div>
          <Input
            register={register}
            name="price"
            error={errors.price?.message}
            placeholder="Ex: R$ 20.000,00"
            label="Preço"
          />

          <TextArea
            name="description"
            register={register}
            placeholder="Digite as informações completa sobre o veículo..."
            label="Descrição do veículo"
            error={errors.description?.message}
          />

          <Button loading={loading}>Cadastrar</Button>

        </form>

      </div>
    </>
  )
}