import { useState, useEffect } from 'react';
import { OutfitFullResponse } from '../types';
import { fetchOutfitFull } from '../api';

export function useOutfitFull(personId: string | undefined) {
    const [data, setData] = useState<OutfitFullResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!personId) return;

        let isMounted = true;

        setLoading(true);
        fetchOutfitFull(personId)
            .then((res) => {
                if (isMounted) {
                    setData(res);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setData(null);
                    setError(err instanceof Error ? err : new Error('Unknown error'));
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [personId]);

    return { data, loading, error };
}
