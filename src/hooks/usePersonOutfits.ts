import { useState, useEffect } from 'react';
import { PersonOutfitsResponse } from '../types';
import { fetchPersonOutfits, fetchPersonsByGender } from '../api';

export function usePersonOutfits(gender: string | undefined) {
    const [data, setData] = useState<PersonOutfitsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!gender) return;
        let isMounted = true;

        setLoading(true);
        // 1. Fetch persons by gender (since the backend now supports ?gender=xyz)
        // We know we only have 1 persona per gender
        fetchPersonsByGender(gender)
            .then((persons) => {
                if (persons.length === 0) throw new Error("No personas found for this gender.");
                const personId = persons[0].id;
                // 2. Fetch all outfits for this person
                return fetchPersonOutfits(personId);
            })
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
    }, [gender]);

    return { data, loading, error };
}
