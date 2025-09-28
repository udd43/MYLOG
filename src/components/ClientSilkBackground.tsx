'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Silk = dynamic(() => import('./SilkBackground'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
  )
})

interface ClientSilkBackgroundProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

export default function ClientSilkBackground(props: ClientSilkBackgroundProps) {
  return (
    <Suspense fallback={
      <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
    }>
      <Silk {...props} />
    </Suspense>
  )
}
