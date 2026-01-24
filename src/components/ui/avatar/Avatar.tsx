import { avatarStyles } from './avatar.styles';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
}

export const Avatar = ({
  src,
  alt,
  size,
  interactive,
  className,
}: AvatarProps) => (
  <div className={`${avatarStyles({ size, interactive })} ${className ?? ''}`}>
    <img src={src} alt={alt} className='w-full h-full object-cover' />
  </div>
);