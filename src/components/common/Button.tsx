import { VARIANT } from '../../types'

type ButtonProps = {
  children: string
  onClick: () => void
  variant: VARIANT
}

const VARIANT_PRIMARY_STYLE =
  'bg-gradient-to-rb from-[#FC1C37] to-[#AD40E1] text-[24px] text-cWhite rounded-full hover:from-cWhite hover:to-cWhite hover:text-cBlack font-bold px-[48px] py-[16px]'

const VARIANT_SECONDARY_STYLE =
  'bg-gradient-to-rb from-[#FC1C37] to-[#AD40E1] text-[16px] text-cWhite rounded-full hover:from-cWhite hover:to-cWhite font-bold px-[14px] py-[10px]'

export const Button = ({ children, onClick, variant }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        variant === VARIANT.PRIMARY
          ? VARIANT_PRIMARY_STYLE
          : VARIANT_SECONDARY_STYLE
      }
    >
      {children}
    </button>
  )
}
