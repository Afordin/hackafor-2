import { useEffect, useRef, useState } from "react";
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

export const Header = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
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
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: "#060606",
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <article className="relative flex justify-center min-h-screen w-full">
      <section
        style={{
          zIndex: 10,
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        id="vantajs-bg"
        ref={vantaRef}
      >
        <div className="flex flex-col absolute items-center justify-center font-bold w-full h-full ">
          <h1 className="text-[200px]">Hackafor</h1>
          <h2 className="text-[48px] mt-[-70px]">
            Una hackaton de programación
          </h2>
        </div>
      </section>
    </article>
  );
};
