import {  useEffect, useRef, useState } from "react";
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

export const Background = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          size: 0.60,
          scale: 1,
          scaleMobile: 1,
          yOffset: 0.20,
          amplitudeFactor: 0,
          backgroundColor: "#000000",
          baseColor: '#AD40E1',
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);



  return (
    <section
    style={{
      position: "absolute",
      zIndex: -1,
      width: "100%",
      height: "150vh",
    }}
    ref={vantaRef}
  >
  </section>
  )


}