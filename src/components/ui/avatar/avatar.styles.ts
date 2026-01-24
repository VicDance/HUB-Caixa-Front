import { cva } from 'class-variance-authority';

export const avatarStyles = cva('rounded-xl overflow-hidden flex-shrink-0', {
  variants: {
    size: {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
    },
    interactive: {
      true: 'transition-transform duration-300 hover:scale-105',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    interactive: false,
  },
});
