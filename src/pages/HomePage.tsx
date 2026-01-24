import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from '@/components/Filter';
import { useCharacters } from '@/hooks/useCharacters';
import CharacterComponent from '@/components/Character';

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({});
  const { characters, loading, error } = useCharacters(filters);
  const navigate = useNavigate();

  if (loading)
    return <p className='p-6 text-center text-green-500'>Cargando portal...</p>;
  if (error) return <p className='p-6 text-center text-red-500'>{error}</p>;

  const getBentoClass = (index: number) => {
    const pos = index % 5;
    if (pos === 0) return 'md:col-span-2 md:row-span-2 h-full';
    if (pos === 1) return 'md:col-span-2 md:row-span-1 h-full';
    return 'md:col-span-1 md:row-span-1 h-full';
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow p-6 mb-4'>
        <h1 className='text-2xl font-bold text-gray-800 italic'>
          Rick & Morty <span className='text-green-500'>Multiverse</span>
        </h1>
      </header>

      <div className='max-w-7xl mx-auto px-6'>
        <Filter onChange={setFilters} />

        <section className='grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4 py-8'>
          {characters.map((character, index) => (
            <div
              key={character.id}
              className={`${getBentoClass(index)} transition-all duration-300 hover:z-10`}
            >
              <CharacterComponent
                character={character}
                onClick={(id) => navigate(`/character/${id}`)}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
