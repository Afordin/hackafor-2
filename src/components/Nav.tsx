import { VARIANT } from '../types'
import { Button } from './common/Button'

export const Nav = () => {
  return (
    <nav className="mx-auto flex px-[24px] py-[12px] text-[16px] h-fit border-[0.2px] border-cBorder rounded-full items-center gap-[42px] text-cGray bg-cBackground">
      <img src="./images/logo.png" width={35} height={32}></img>
      <div className="flex items-center gap-3">
        <p>Inicio</p>
        <span className="w-[6px] h-[6px] bg-cGray rounded-full inline-block"></span>
        <p>Reglamento</p>
        <span className="w-[6px] h-[6px] bg-cGray rounded-full inline-block"></span>
        <p>Proyectos</p>
        <span className="w-[6px] h-[6px] bg-cGray rounded-full inline-block"></span>
      </div>
      <Button
        onClick={() => {
          console.log('has clickado')
        }}
        variant={VARIANT.SECONDARY}
      >
        Accede con Discord
      </Button>
    </nav>
  )
}
