import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toBase64(str: string) {
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
}