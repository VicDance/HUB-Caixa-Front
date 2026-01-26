import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from '@/components/Filter';
import { useCharacters } from '@/hooks/useCharacters';
import CharacterComponent from '@/components/Character';

// HomePage.tsx
const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({});
  const { characters, loading } = useCharacters(filters);
  const navigate = useNavigate();

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
        <Filter onChange={setFilters} />

        <div className='flex flex-col'>
          {characters.map((character) => (
            <div key={character.id} className='flex flex-row'>
              <CharacterComponent
                character={character}
                onClick={(id) => navigate(`/character/${id}`)}
              />
              {/* <div>Holita</div> */}
            </div>
          ))}
        </div>

        {/* <section className='flex flex-col mt-10'>
          {characters.map((character) => (
            <div key={character.id} className='flex gap-50'>
              <CharacterComponent
                character={character}
                onClick={(id) => navigate(`/character/${id}`)}
              />
            </div>
          ))}
        </section> */}
      </div>
    </div>
  );
};

export default HomePage;
