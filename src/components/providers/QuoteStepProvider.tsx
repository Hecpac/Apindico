"use client"

import * as React from "react"

interface QuoteStepContextValue {
  currentStep: number
  setCurrentStep: (step: number) => void
}

const QuoteStepContext = React.createContext<QuoteStepContextValue | null>(null)

export function QuoteStepProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = React.useState(1)

  return (
    <QuoteStepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </QuoteStepContext.Provider>
  )
}

export function useQuoteStep() {
  const context = React.useContext(QuoteStepContext)
  if (!context) {
    throw new Error("useQuoteStep must be used within QuoteStepProvider")
  }
  return context
}
