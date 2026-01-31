import CharacterComponent from '@/components/Character/Character';
import FilterComponent from '@/components/filter/FilterComponent';
import { useCharacters } from '@/hooks/useCharacters';
import { useFavourites } from '@/hooks/useFavourites';
import { useNavigate, useSearchParams } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const filters = {
    name: searchParams.get('name') || undefined,
    species: searchParams.get('species') || undefined,
  };
  const { characters, loading } = useCharacters(filters);
  const { favourites } = useFavourites();

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

      {favourites.length > 0 && (
        <section className='mb-10 p-6 bg-blue-50 rounded-3xl'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            ⭐ My Favorites ({favourites.length})
          </h2>
          <div className='grid grid-cols-4 md:grid-cols-4 gap-4'>
            {favourites.map((fav) => (
              <div
                key={fav.id}
                onClick={() => navigate(`/character/${fav.id}`)}
                className='cursor-pointer'
              >
                <img
                  src={fav.image}
                  className='w-16 h-16 rounded-full border-2 border-white'
                />
                <p className='text-xs font-bold mt-1 truncate'>{fav.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

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
