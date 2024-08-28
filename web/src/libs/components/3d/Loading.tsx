'use client'

import { ProgressLogo } from '@/libs/components/ProgressLogo'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const MAX_VIDEO_SPEED = 5

type Props = {
  isLoaded?: boolean
  onLoaded?: () => void
}

export function Loading({ isLoaded, onLoaded }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playBackRate, setPlayBackRate] = useState(1.0)
  const { progress } = useProgress()

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setPlayBackRate((playBackRate) => {
          const speed = playBackRate + 0.5
          return speed < MAX_VIDEO_SPEED ? speed : MAX_VIDEO_SPEED
        })
        if (videoRef.current) {
          videoRef.current.playbackRate = playBackRate
          if (videoRef.current?.classList.contains('grayscale')) {
            videoRef.current.classList.remove('grayscale')
          }
        }
      }, 200)
    }
  }, [isLoaded, playBackRate])

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loading"
          className="relative h-screen w-screen overflow-hidden"
          exit={{
            opacity: 0,
            transition: {
              delay: 2,
              duration: 0.5,
              ease: 'easeIn',
            },
          }}
        >
          <motion.video
            key="warp_video"
            ref={videoRef}
            autoPlay
            loop
            muted
            className="w-full  grayscale"
            exit={{
              scale: 2,
              transition: {
                duration: 4,
                ease: 'easeIn',
              },
            }}
          >
            <source src="/videos/warp.mp4" type="video/mp4" />
          </motion.video>
          {!isLoaded && (
            <div className="absolute inset-0">
              <motion.div
                key="progress_logo"
                className="flex h-screen w-screen items-center justify-center"
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    delay: 0.2,
                    repeat: 4,
                    ease: 'linear',
                  },
                }}
              >
                <ProgressLogo progress={progress} onCompleted={onLoaded} />
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
