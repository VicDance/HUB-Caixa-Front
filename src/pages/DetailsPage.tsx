import CharacterComponent from '@/components/Character';
import { useCharacters } from '@/hooks/useCharacters';
import { useParams } from 'react-router-dom';

const FILTERS = {};

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { characters, loading, error } = useCharacters(FILTERS, Number(id));

  const character = characters[0];

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-blue-500 font-semibold animate-pulse'>
        Loading character...
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        {error || 'Character not found'}
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4'>
        <CharacterComponent
          character={character}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
