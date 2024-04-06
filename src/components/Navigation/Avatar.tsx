import { FC, useRef, useState } from 'react';
import { cn, useAuth, useOnClickOutside } from '@common';

interface Props {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Specify the size of the avatar
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the avatar
   */
  avatar: string;
}

export const Avatar: FC<Props> = ({ avatar, className, size = 'sm' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  // TODO: add responsive design
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, () => setIsOpen(false));

  const classes = {
    container: ` flex w-fit h-full items-center relative gap-4 ${className} text-white`,
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    image: 'rounded-full',
    imageIcon: 'absolute bottom-[-5px] right-[-5px] text-inherit font-bold text-lg',
    text: 'flex text-white hover:text-primary-400 items-center gap-3 text-inherit bg-transparent rounded-lg font-semibold text-sm cursor-pointer',
    modal: 'absolute top-10  right-[-5px] border-1 border-cBorder rounded-lg px-5 py-2 bg-cBackground w-40 cursor-pointer'
  };

  return (
    <div className={classes.container} ref={modalRef}>
      <span
        className="relative cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className={cn('i-material-symbols-expand-more', classes.imageIcon, isOpen && 'text-yellow')} />
        <img className={cn(classes[size], classes.image)} src={avatar} alt="avatar" />
      </span>
      {/* modal */}
      {isOpen && (
        <div className={classes.modal}>
          <p className={classes.text} onMouseDown={(e) => e.stopPropagation()} onClick={signOut}>
            <span className="i-material-symbols-exit-to-app-rounded" />
            Cerrar sesión
          </p>
        </div>
      )}
    </div>
  );
};
