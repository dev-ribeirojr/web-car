import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
  name: string
  label?: string
}

export function Input({ register, name, rules, error, label, ...rest }: InputProps) {
  return (
    <div className="mb-3 w-full">
      {label &&
        <p className="mb-2 font-medium">{label}:</p>
      }
      <input
        type="text"
        className="w-full border-2 rounded-md h-11 px-2 outline-none"
        {...rest}
        {...register(name, rules)}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  )
}
