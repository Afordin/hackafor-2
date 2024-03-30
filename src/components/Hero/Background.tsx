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
      yOffset: 0.15,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200,
      minWidth: 200,
      size: 0.6,
      scale: 1,
      scaleMobile: 1,
      amplitudeFactor: 0,
      backgroundColor: 0x60606,
      baseColor: '#AD40E1'
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
        width: '100%',
        height: '140vh'
      }}
      ref={setVanta}
    ></div>
  )
}
