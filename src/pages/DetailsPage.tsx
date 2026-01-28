import { useCharacters } from '@/hooks/useCharacters';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { characters, loading, error } = useCharacters({}, Number(id));
  const [imageLoaded, setImageLoaded] = useState(false);

  const character = characters[0];

  if (loading || !character) {
    return (
      <div className='min-h-screen flex items-center justify-center text-blue-500 font-semibold animate-pulse'>
        Loading character...
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='w-full md:w-64 h-64 rounded-xl overflow-hidden relative'>
            {!imageLoaded && (
              <div className='absolute inset-0 bg-gray-200 animate-pulse'></div>
            )}
            {/* <img
              src={character.image}
              alt={character.name}
              loading='eager'
              decoding='async'
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            /> */}
            <div>Carga</div>
          </div>

          <div className='flex-1'>
            <h2 className='text-2xl font-bold text-gray-800'>
              {character.name}
            </h2>
            <p className='text-gray-600 mt-2'>
              <strong>Estado:</strong> {character.status}
            </p>
            <p className='text-gray-600'>
              <strong>Especie:</strong> {character.species}
            </p>
            <p className='text-gray-600'>
              <strong>Tipo:</strong> {character.type || 'N/A'}
            </p>
            <p className='text-gray-600'>
              <strong>Género:</strong> {character.gender}
            </p>
            <p className='text-gray-600'>
              <strong>Ubicación:</strong> {character.location.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
