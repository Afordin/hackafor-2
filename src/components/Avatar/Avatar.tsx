import { FC } from 'react';
import { cn } from '@common';

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
  const classes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    image: 'rounded-full'
  };

  return <img className={cn(classes[size], classes.image, className)} src={avatar} alt="avatar" />;
};
