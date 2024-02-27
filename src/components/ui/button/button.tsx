import { ButtonHTMLAttributes } from "react";
import { Loading } from "..";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function Button({ loading, children }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full rounded-md h-11 bg-zinc-900 text-white font-medium flex items-center justify-center"
    >
      {loading ? <Loading /> : children}
    </button>
  )
}