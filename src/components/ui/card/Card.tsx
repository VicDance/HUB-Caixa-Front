import { HTMLAttributes } from 'react';
import { cardStyles } from './card.styles';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
  variant,
  padding,
  className,
  ...props
}: CardProps) => (
  <div className={cardStyles({ variant, padding, className })} {...props} />
);
