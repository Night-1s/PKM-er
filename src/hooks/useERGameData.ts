import { useEffect, useMemo, useState } from "react";
import { loadERGameData, getAbilities, type ERGameData, type ERSpecies } from "@/data/erPokedex";

interface UseERGameDataResult {
  data: ERGameData | null;
  loading: boolean;
  error: Error | null;
}

let cached: ERGameData | null = null;
let loadingPromise: Promise<ERGameData> | null = null;

export function useERGameData(): UseERGameDataResult {
  const [data, setData] = useState<ERGameData | null>(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cached) return;

    if (!loadingPromise) {
      loadingPromise = loadERGameData();
    }

    setLoading(true);
    loadingPromise
      .then((d) => {
        cached = d;
        setData(d);
        setError(null);
      })
      .catch((e) => {
        setError(e instanceof Error ? e : new Error(String(e)));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

export function useSpeciesAbilities(nameCn: string): {
  abilities: string[];
  innates: string[];
  species: ERSpecies | undefined;
  loading: boolean;
} {
  const { data, loading } = useERGameData();

  const species = useMemo(
    () => data?.species.find((s) => s.name === nameCn || s.NAME === nameCn.toUpperCase()),
    [data, nameCn],
  );

  const abilities = useMemo(() => {
    const raw = data && species ? getAbilities(species.stats.abis, data.abilities) : [];
    return raw;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, species, JSON.stringify(species?.stats.abis)]);

  const innates = useMemo(() => {
    const raw = data && species ? getAbilities(species.stats.inns, data.abilities) : [];
    return raw;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, species, JSON.stringify(species?.stats.inns)]);

  return { abilities, innates, species, loading };
}
