import { useEffect, useRef, useState } from "react";

export interface FilterProps {
  onChange: (filters: { name?: string; species?: string }) => void;
}

const Filters = ({ onChange }: FilterProps) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');

  const TIMEOUT = 300;

  const handleApplyFilters = () => {
    onChange({ name, species });
  };

  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChangeRef.current({
        name: name.trim() || undefined,
        species: species || undefined,
      });
    }, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [name, species]);

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
      <button
        onClick={handleApplyFilters}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Filter
      </button>
    </div>
  );
};

export default Filters;
