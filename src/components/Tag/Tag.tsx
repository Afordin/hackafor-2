import React from 'react';
import { cn, TagSize, TagVariant } from '@common';

const TagVariants: Record<TagVariant, string> = {
  [TagVariant.primary]: 'bg-gradient-to-rb from-black via-[#331e22] to-[#2c2130]',
  [TagVariant.secondary]: 'bg-black',
  [TagVariant.neutral]: 'bg-black'
};

const TagContainerVariants: Record<TagVariant, string> = {
  [TagVariant.primary]: 'bg-gradient-to-rb from-primary-600 to-secondary-500 text-white',
  [TagVariant.secondary]: 'bg-gradient-to-rb from-blue-500 to-green-500 text-white',
  [TagVariant.neutral]: 'bg-gradient-to-rb from-neutral-700 to-neutral-800 text-white'
};

const Sizes: Record<TagSize, string> = {
  [TagSize.xs]: 'text-sm',
  [TagSize.sm]: 'text-base',
  [TagSize.md]: 'text-lg',
  [TagSize.lg]: 'text-xl'
};

const BorderSizes: Record<TagSize, string> = {
  [TagSize.xs]: 'p-px',
  [TagSize.sm]: 'p-[2px]',
  [TagSize.md]: 'p-[3px]',
  [TagSize.lg]: 'p-1'
};

interface TagProps {
  /**
   * Set the Tag content
   */
  children: string | React.ReactNode;

  /**
   * The shape of the component.
   */
  variant?: TagVariant;

  /**
   * The size of the component
   */
  size?: TagSize;

  /**
   * The size of the border
   */
  borderSize?: TagSize;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

export const Tag = ({ children, variant = TagVariant.primary, size = TagSize.sm, className, borderSize = TagSize.xs }: TagProps) => {
  const classes = {
    container: cn('flex items-center justify-center rounded-full w-fit', TagContainerVariants[variant], BorderSizes[borderSize], className),
    tag: cn('rounded-full py-px px-2', TagVariants[variant], Sizes[size])
  };

  return (
    <span className={classes.container}>
      <span className={classes.tag}>{children}</span>
    </span>
  );
};
