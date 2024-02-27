import { TextareaHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
  name: string
  label?: string
}

export function TextArea({ register, name, rules, error, label, ...rest }: TextAreaProps) {
  return (
    <div className="mb-3 w-full">
      {label &&
        <p className="mb-2 font-medium">{label}:</p>
      }
      <textarea
        className="border-2 w-full rounded-md h-24 px-2 pt-1"
        {...rest}
        {...register(name, rules)}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  )
}
