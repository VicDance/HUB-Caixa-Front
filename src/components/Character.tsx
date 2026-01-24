import { Avatar } from '@/components/ui/avatar';
import { Character } from '@/types/character';
import { Card } from '@/components/ui/card';

interface Props {
  character: Character;
  onClick: (id: number) => void;
}

const CharacterComponent = ({ character, onClick }: Props) => (
  <Card
    variant="elevated"
    className="cursor-pointer flex flex-col sm:flex-row items-center gap-4 h-full w-full p-4 overflow-hidden"
    onClick={() => onClick(character.id)}
  >
    <Avatar
      src={character.image}
      alt={character.name}
      size="lg"
      interactive
      className="flex-shrink-0"
    />

    <div className="flex-1 min-w-0 text-center sm:text-left">
      <h3 className="text-lg font-semibold truncate leading-tight">
        {character.name}
      </h3>
      <p className="text-sm text-gray-500 italic">
        {character.species}
      </p>
      <p className="text-xs text-gray-400 truncate mt-1 hidden md:block">
        📍 {character.location.name}
      </p>
    </div>
  </Card>
);

export default CharacterComponent;
