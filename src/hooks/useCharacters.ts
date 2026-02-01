import { useEffect, useMemo, useRef, useState } from 'react';
import { Character } from '@/types/character';
import { getCharacters, getCharacterById } from '@/api/characterApi';
import { CharacterFilters } from '@/components/filter/FilterComponent';

const cache = new Map<string, Character[]>();

export const useCharacters = (filters: CharacterFilters = {}, id?: number) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [loadingResidents, setLoadingResidents] = useState<boolean>(false);

  const cacheKey = useMemo(
    () => JSON.stringify({ id, ...filters }),
    [id, filters],
  );
  const filtersRef = useRef(filters);
  const idRef = useRef(id);

  useEffect(() => {
    filtersRef.current = filters;
    idRef.current = id;
  }, [filters, id]);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      if (cache.has(cacheKey)) {
        setCharacters(cache.get(cacheKey)!);
        setLoading(false);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const data =
          idRef.current != null
            ? [await getCharacterById(idRef.current, controller.signal)]
            : await getCharacters(filtersRef.current, controller.signal);

        if (isMounted) {
          cache.set(cacheKey, data);
          setCharacters(data);
          setLoading(false);
          setError(null);
        }

        const character = data[0];
        if (
          id &&
          character?.location?.url &&
          character.location.name !== 'unknown'
        ) {
          setLoadingResidents(true);

          fetch(character.location.url, { signal: controller.signal })
            .then((res) => res.json())
            .then(async (planet) => {
              const neighborIds = planet.residents
                .slice(0, 5)
                .map((url: string) => url.split('/').pop());
              const neighbors = await Promise.all(
                neighborIds.map((nId: string) =>
                  getCharacterById(Number(nId), controller.signal),
                ),
              );
              if (isMounted) {
                setResidents(neighbors);
              }
            })
            .catch(() => {})
            .finally(() => {
              if (isMounted) {
                setLoadingResidents(false);
              }
            });
        } else {
          setResidents([]);
        }
      } catch (err: unknown) {
        const error = err as Error;
        if (
          error.name === 'AbortError' ||
          error.message === 'The operation was aborted'
        ) {
          return;
        }
        if (isMounted) {
          setError(error.message);
          setLoading(false);
          setLoadingResidents(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cacheKey, id]);

  return { characters, loading, error, residents, loadingResidents };
};
