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
        <div className='mb-12 animate-in fade-in slide-in-from-top-4 duration-700'>
          <div className='flex items-center justify-between mb-4 px-2'>
            <h2 className='text-xl font-black text-gray-800 uppercase tracking-tighter flex items-center gap-2'>
              <span className='text-2xl'>⭐</span> My Collection
            </h2>
            <span className='text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full'>
              {favourites.length} Characters
            </span>
          </div>
          {/* Fila Horizontal con Scroll */}
          <div className='flex overflow-x-auto pb-6 pt-2 no-scrollbar' style={{gap: 12}}>
            {favourites.map((fav) => (
              <div
                key={fav.id}
                onClick={() => navigate(`/character/${fav.id}`)}
                className='flex-shrink-0 group cursor-pointer text-center'
              >
                <div className='relative w-20 h-20 mb-2'>
                  <img
                    src={fav.image}
                    alt={fav.name}
                    className='w-full h-full object-cover rounded-full border-4 border-white shadow-md group-hover:border-blue-400 transition-all duration-300 transform group-hover:scale-110'
                  />
                </div>
                <p className='text-[10px] font-black text-gray-700 uppercase tracking-tighter truncate w-20'>
                  {fav.name.split(' ')[0]}{' '}
                  {/* Solo el primer nombre para que no ocupe mucho */}
                </p>
              </div>
            ))}
          </div>
          <div className='h-px bg-gray-200 w-full mt-2' />{' '}
        </div>
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
