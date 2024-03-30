import { useEffect, useState } from 'react'
import * as THREE from 'three'
import HALO from 'vanta/dist/vanta.halo.min'

export const Background = () => {
  const [vanta, setVanta] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!vanta) return

    const vantaEffect: object = HALO({
      el: vanta,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 300,
      minWidth: 300,
      speed: 0.2,
      backgroundColor: 0x60606,
      baseColor: '#FC1C37',
      color2: '#AD40E1'
    })

    return () => {
      if (!(vantaEffect instanceof Object)) return
      if (!('destroy' in vantaEffect)) return
      if (typeof vantaEffect.destroy !== 'function') return
      vantaEffect.destroy()
    }
  }, [vanta])

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
      ref={setVanta}
    >
      {/* bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-cBackground to-transparent"></div>
    </div>
  )
}
