import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines and merges Tailwind/UNO CSS classes using twMerge and clsx utility functions.
 * twMerge is used to handle conflicts between classes effectively.
 *
 * @param {...ClassValue} inputs - An array of class values to be combined and merged.
 * @returns {string} - The merged and combined class names as a string.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/**
 * Source:
 * Tailwind merge: https://github.com/dcastil/tailwind-merge/tree/v1.14.0
 */
