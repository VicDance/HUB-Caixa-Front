import CharacterComponent from '@/components/Character/Character';
import FilterComponent from '@/components/filter/FilterComponent';
import { useCharacters } from '@/hooks/useCharacters';
import { useNavigate, useSearchParams } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const filters = {
    name: searchParams.get('name') || undefined,
    species: searchParams.get('species') || undefined,
  };
  const { characters, loading } = useCharacters(filters);

  if (loading) return <div className="flex justify-center p-20 text-blue-500 animate-pulse font-bold text-xl">LOADING MULTIVERSE...</div>;
  
  return (
    <div className='min-h-screen bg-[#f9fafb] font-["Open_Sans",sans-serif]'>
      <header className='bg-white py-12 px-6 text-center border-b border-gray-100'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight'>
          Our <span className='text-blue-600'>Characters</span>
        </h1>
        <p className='mt-4 text-gray-500 max-w-2xl mx-auto text-lg'>
          Explore the vast population of the Rick and Morty universe with
          detailed information on every inhabitant.
        </p>
      </header>

      <div className='max-w-7xl p-6 md:p-12'>
        <FilterComponent />

        <div
          className={`flex flex-col transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
          {characters.map((character) => (
            <div key={character.id} className='flex flex-row'>
              <CharacterComponent
                character={character}
                onClick={(id) => navigate(`/character/${id}`)}
              />
            </div>
          ))}
          {characters.length === 0 && !loading && (
            <div className='text-center py-20 text-gray-400'>
              <p className='text-xl'>
                No characters found in this dimension...
              </p>
              <button
                onClick={() => navigate('/')}
                className='mt-4 text-blue-500 hover:underline'
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
