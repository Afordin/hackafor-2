import { VARIANT } from '../common'
import { Button } from './common/Button'
import { ROUTE } from '../constants'

export const Nav = () => {
  return (
    <nav className="mx-auto flex px-[24px] py-[12px] text-[16px] h-fit border-[0.2px] border-cBorder rounded-full items-center gap-[42px] text-cGray bg-cBackground">
      <img src="./images/logo.png" width={35} height={32}></img>
      <div className="flex items-center gap-3">
        <Link to={ROUTE.home} className="cursor-pointer hover:text-white">
          Inicio
        </Link>
        <span className="w-[6px] h-[6px] bg-cGray rounded-full inline-block cursor-pointer"></span>
        <Link to={ROUTE.projects} className="cursor-pointer hover:text-white">
          Proyectos
        </Link>
        <span className="w-[6px] h-[6px] bg-cGray rounded-full inline-block"></span>
        <Link
          to={ROUTE.registration}
          className="cursor-pointer hover:text-white"
        >
          Registro
        </Link>
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
