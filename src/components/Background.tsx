import { useEffect, useState } from 'react'
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'

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
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: '#060606',
    })

    return () => {
      if (!(vantaEffect instanceof Object)) return
      if (!('destroy' in vantaEffect)) return
      if (typeof vantaEffect.destroy !== 'function') return
      vantaEffect.destroy()
    }
  }, [vanta])

  return <div ref={setVanta} className="w-full min-h-screen" id="vantajs-bg" />
}
