import LogoSvg from '@public/logo.svg'
import { useEffect, useState } from 'react'

type Props = {
  className?: string
  progress: number
  onCompleted?: () => void
}

export function ProgressLogo({ className, progress = 0, onCompleted }: Props) {
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (!isCompleted && onCompleted && progress === 100) {
      setIsCompleted(true)
      onCompleted()
    }
  }, [isCompleted, onCompleted, progress])

  return (
    <div className={`${className} size-fit`}>
      <LogoSvg
        role="img"
        className="m-auto size-48 fill-gray-300"
        aria-label="ロゴ画像"
      />
      <progress className="w-full" max={100} value={progress} />
    </div>
  )
}
