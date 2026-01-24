import { Character } from '@/types/character';

interface Props {
  character: Character;
  othersInLocation: Character[];
}

const DetailsPage: React.FC<Props> = ({ character, othersInLocation }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={character.image}
            alt={character.name}
            className="w-full md:w-64 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{character.name}</h2>
            <p className="text-gray-600 mt-2"><strong>Estado:</strong> {character.status}</p>
            <p className="text-gray-600"><strong>Especie:</strong> {character.species}</p>
            <p className="text-gray-600"><strong>Tipo:</strong> {character.type || 'N/A'}</p>
            <p className="text-gray-600"><strong>Género:</strong> {character.gender}</p>
            <p className="text-gray-600"><strong>Ubicación:</strong> {character.location.name}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Otros personajes en {character.location.name}:</h3>
          <div className="flex flex-wrap gap-4">
            {othersInLocation.map((c) => (
              <div
                key={c.id}
                className="bg-gray-100 rounded-lg p-2 px-4 text-gray-700 text-sm"
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
