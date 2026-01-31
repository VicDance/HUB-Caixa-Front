import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface CharacterFilters {
  name?: string;
  species?: string;
}

export interface FilterProps {
  onChange: (filters: CharacterFilters) => void;
  initialFilters?: CharacterFilters;
}

const FilterComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [species, setSpecies] = useState(searchParams.get('species') || '');

  const TIMEOUT = 500;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params: Record<string, string> = {};
      if (name.trim()) params.name = name.trim();
      if (species) params.species = species;

      setSearchParams(params, { replace: true });
    }, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [name, species, setSearchParams]);

  return (
    <div className='flex gap-4 mb-8'>
      <input
        type='text'
        placeholder='Search by name...'
        className='p-2 border rounded'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        className='p-2 border rounded'
      >
        <option value=''>All Species</option>
        <option value='human'>Human</option>
        <option value='alien'>Alien</option>
      </select>
    </div>
  );
};

export default FilterComponent;
