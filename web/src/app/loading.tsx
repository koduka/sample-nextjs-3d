'use client'

import { useRef } from 'react'

export default function WarpLoading() {
  const videoRef = useRef<HTMLVideoElement>(null!)

  return (
    <div className="h-screen w-screen overflow-hidden">
      <video ref={videoRef} autoPlay loop muted className="w-full">
        <source src="/videos/warp.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
