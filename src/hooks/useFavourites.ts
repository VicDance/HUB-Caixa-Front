import { Character } from '@/types/character';
import { useEffect, useState } from 'react';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<Character[]>(() => {
    const saved = localStorage.getItem('rm-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('rm-favorites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (character: Character) => {
    setFavourites((prev) => {
      const isFav = prev.some((fav) => fav.id === character.id);
      if (isFav) {
        return prev.filter((fav) => fav.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

  const isFavourite = (id: number) => favourites.some((fav) => fav.id === id);

  return { favourites, toggleFavourite, isFavourite };
};
