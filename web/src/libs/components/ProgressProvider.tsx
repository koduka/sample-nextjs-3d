import type { ProviderProps } from 'react'

import { createContext, useContext, useEffect, useState } from 'react'

type ProgressContext = {
  progress: number
  setProgressValue: (key: string, value: number) => void
}

type ProgressProviderProps = Pick<ProviderProps<ProgressContext>, 'children'>

type Progresses = {
  [key: string]: number
}

const ProgressContext = createContext<ProgressContext>({
  progress: 0,
  setProgressValue: () => {
    throw new Error(
      'ProgressProviderが親コンポーネントで見つかりませんでした。',
    )
  },
})

export function useProgress() {
  return useContext(ProgressContext)
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [progress, setProgress] = useState(0)
  const [progresses, setProgresses] = useState<Progresses>({})
  const setProgressValue = (key: string, value: number) => {
    setProgresses((current) => {
      const newProgresses = { ...current }
      newProgresses[key] = value
      return newProgresses
    })
  }

  useEffect(() => {
    setProgress(() => {
      const totalValue = Object.values(progresses).reduce(
        (acc, curr) => acc + curr,
        0,
      )
      const totalCaount = Math.max(Object.keys(progresses).length, 1)
      return (totalValue / totalCaount) * 100
    })
  }, [progresses])

  return (
    <ProgressContext.Provider value={{ progress, setProgressValue }}>
      {children}
    </ProgressContext.Provider>
  )
}
