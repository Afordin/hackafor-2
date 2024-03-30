import { PropsWithChildren } from 'react'

interface CardProps {
  isMainCard?: boolean
}

export function Card({
  children,
  isMainCard = false
}: PropsWithChildren<CardProps>) {
  return (
    <div
      className={`w-full bg-cBlack border border-pBorder rounded-4 p-6 flex flex-col items-center gap-4 ${
        isMainCard ? 'md:flex-row md:gap-10' : 'md:items-start'
      } lg:px-10`}
    >
      {children}
    </div>
  )
}
