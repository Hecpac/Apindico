'use client'

import { useLenis } from '@/hooks/useLenis'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useLenis()
  return <>{children}</>
}
