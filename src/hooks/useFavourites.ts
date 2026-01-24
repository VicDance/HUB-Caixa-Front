import { useEffect, useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('favorites') ?? '[]'),
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, toggleFavorite };
};
