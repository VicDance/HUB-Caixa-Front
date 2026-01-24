import { cva } from 'class-variance-authority';

export const cardStyles = cva('bg-white rounded-2xl transition-shadow', {
  variants: {
    variant: {
      default: 'shadow-sm',
      elevated: 'shadow-md hover:shadow-lg',
    },
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});
