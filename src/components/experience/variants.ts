import { cva } from 'class-variance-authority';

/**
 * Color variants for experience components.
 * Shared across experience-card and experience-history.
 */
export type ColorVariant =
  | 'default'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'pink';

/**
 * Icon background color variants
 */
export const iconVariants = cva(
  'flex rounded bg-gradient-to-b p-1 transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'bg-indigo-700/90',
        red: 'bg-red-700/90',
        green: 'bg-green-700/90',
        blue: 'bg-blue-700/90',
        yellow: 'bg-yellow-700/90',
        orange: 'bg-orange-700/90',
        purple: 'bg-purple-700/90',
        pink: 'bg-pink-700/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Title text color variants on hover
 */
export const titleVariants = cva(
  'text-foreground font-semibold transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'group-hover:text-primary',
        red: 'group-hover:dark:text-red-500 group-hover:text-red-700',
        green: 'group-hover:dark:text-green-500 group-hover:text-green-700',
        blue: 'group-hover:dark:text-blue-500 group-hover:text-blue-700',
        yellow: 'group-hover:dark:text-yellow-500 group-hover:text-yellow-700',
        orange: 'group-hover:dark:text-orange-500 group-hover:text-orange-700',
        purple: 'group-hover:dark:text-purple-500 group-hover:text-purple-700',
        pink: 'group-hover:dark:text-pink-500 group-hover:text-pink-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
