import { useCharacters } from '@/hooks/useCharacters';
import { useParams, useNavigate } from 'react-router-dom';

const FILTERS = {};
const textStyle = {
  color: 'GrayText'
};

const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { characters, loading, error, residents } = useCharacters(FILTERS, Number(id));

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
    <div className='min-h-screen bg-gray-50 p-4 md:p-10'>
      <div className='max-w-3xl mx-auto'>
        <button
          onClick={() => navigate(-1)}
          className='mb-6 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2'
        >
          ← Back to dimension
        </button>
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-10'>
          <div className='flex flex-col items-center'>
            {/* Image */}
            <div
              className='relative w-48 h-48 mb-6 group'
              style={{ paddingTop: '10px' }}
            >
              <img
                src={character.image}
                alt={character.name}
                className='w-full h-full object-cover rounded-full border-4 border-blue-50 shadow-lg'
              />

              {/* State Badge */}
              <span
                className={`absolute bottom-2 -right-4 px-12 py-12 rounded-full text-[10px] font-bold uppercase border-2 border-white shadow-sm text-center`}
                style={{
                  minWidth: '50px',
                  backgroundColor:
                    character.status === 'Alive'
                      ? '#dcfce7'
                      : character.status === 'Dead'
                        ? '#fee2e2'
                        : '#f3f4f6',
                  color:
                    character.status === 'Alive'
                      ? '#166534'
                      : character.status === 'Dead'
                        ? '#991b1b'
                        : '#374151',
                }}
              >
                {character.status}
              </span>
            </div>

            {/* Details */}
            <div className='p-8 md:w-3/5'>
              <div className='flex justify-between items-start mb-4'>
                <h1 className='text-4xl font-black text-gray-900 leading-none'>
                  {character.name}
                </h1>
              </div>

              <div className='grid grid-cols-2 gap-y-6 gap-x-4 mt-8'>
                <div>
                  <p className='text-[16px] uppercase font-bold text-gray-400 tracking-widest'>
                    Species
                  </p>
                  <p style={textStyle}>{character.species}</p>
                </div>
                <div>
                  <p className='text-[16px] uppercase font-bold text-gray-400 tracking-widest'>
                    Gender
                  </p>
                  <p style={textStyle}>{character.gender}</p>
                </div>
                <div>
                  <p className='text-[16px] uppercase font-bold text-gray-400 tracking-widest'>
                    Type
                  </p>
                  <p style={textStyle}>{character.type || 'Standard'}</p>
                </div>
                <div>
                  <p className='text-[16px] uppercase font-bold text-gray-400 tracking-widest'>
                    Origin
                  </p>
                  <p style={textStyle}>{character.origin.name}</p>
                </div>
              </div>

              <div className='mt-8 pt-6 border-t border-gray-50'>
                <p className='text-[16px] uppercase font-bold text-blue-500 tracking-widest'>
                  Current Location
                </p>
                <p style={textStyle}>{character.location.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RESIDENTS */}
        {residents.length > 0 && (
          <div className='mt-12'>
            <h3 className='text-xl font-bold text-gray-800 mb-6'>
              Other residents of{' '}
              <span className='text-blue-600'>{character.location.name}</span>
            </h3>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
              {residents
                .filter((r) => r.id !== character.id)
                .map((resident) => (
                  <div
                    key={resident.id}
                    onClick={() => navigate(`/character/${resident.id}`)}
                    className='bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group'
                  >
                    <img
                      src={resident.image}
                      className='w-full h-auto rounded-xl mb-3 grayscale group-hover:grayscale-0 transition-all'
                      alt={resident.name}
                    />
                    <p className='text-md font-bold text-gray-800 truncate'>
                      {resident.name}
                    </p>
                    <p className='text-[12px] text-gray-400'>
                      {resident.species}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
