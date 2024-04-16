import { FC, useRef, useState } from 'react';
import { AvatarSize, cn, useAuth, useBreakpoint, useOnClickOutside } from '@common';
import { User } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../Avatar/Avatar';

interface Props {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
  /**
   * Specify the user
   * @type User
   */
  user: User;

  avatarSize?: AvatarSize;
}

export const LoggedUser: FC<Props> = ({ className, user, avatarSize = AvatarSize.md }) => {
  const { signOut } = useAuth();
  const { isMobile } = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, () => setIsOpen(false));

  const classes = {
    container: ` flex w-fit h-full items-center relative gap-4 text-white ${className}`,
    expandIcon: 'absolute bottom-[-5px] right-[-5px] text-inherit font-bold text-lg',
    text: 'flex text-white hover:text-primary-400 items-center gap-3 text-inherit bg-transparent rounded-lg font-semibold text-sm cursor-pointer',
    modal: 'absolute top-10  right-[-5px] border-1 border-cBorder rounded-lg px-5 py-2 bg-cBackground w-40 cursor-pointer'
  };

  return isMobile ? (
    <span className="cursor-pointer" onClick={signOut}>
      Salir
    </span>
  ) : (
    <div className={classes.container} ref={modalRef}>
      <span
        className="relative cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className={cn('i-material-symbols-expand-more', classes.expandIcon, isOpen && 'text-yellow')} />
        <Avatar avatar={user.user_metadata.avatar_url} size={avatarSize} />
      </span>
      {/* modal */}
      {isOpen && (
        <div className={classes.modal}>
          <p className={classes.text} onMouseDown={(e) => e.stopPropagation()} onClick={signOut}>
            <span className="i-material-symbols-exit-to-app-rounded" />
            {t('common_log_out')}
          </p>
        </div>
      )}
    </div>
  );
};
