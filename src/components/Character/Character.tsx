import { memo, useState } from 'react';
import { Character } from '@/types/character';
import { useNearScreen } from '@/hooks/useNearScreen';

interface Props {
  character?: Character;
  onClick?: (id: number) => void;
  priority?: boolean;
}

const CharacterComponent = memo(({
  character,
  onClick,
  priority = false,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isNear, elementRef } = useNearScreen<HTMLDivElement>('500px');
  const shouldLoad = priority || isNear;

  return (
    <div
      ref={elementRef}
      className='flex flex-row group cursor-pointer'
      style={{ gap: 20, paddingBottom: 10, paddingTop: 10 }}
      onClick={() => character && onClick?.(character.id)}
    >
      <div className='w-40 h-40 flex-shrink-0 relative bg-gray-100 rounded-lg overflow-hidden'>
        {!isLoaded && (
          <div className='absolute inset-0 bg-gray-200 animate-pulse' />
        )}
        {shouldLoad && (
          <img
            src={character?.image}
            alt={character?.name}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding='async'
          />
        )}
      </div>

      <div className='p-5 flex flex-col justify-between'>
        <h3 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors'>
          {character?.name}
        </h3>

        <p className='text-sm font-medium text-blue-500 uppercase tracking-widest text-[11px]'>
          {character?.species} — {character?.gender}
        </p>

        <p className='text-sm text-gray-400 mt-2 truncate'>
          <span className='text-gray-300'>Origin:</span>{' '}
          {character?.origin.name}
        </p>
      </div>
    </div>
  );
});

export default CharacterComponent;
