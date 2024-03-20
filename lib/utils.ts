import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 合并tailwindcss的类，类似于clsx库
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
