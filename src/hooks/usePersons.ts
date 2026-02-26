import { useState, useEffect } from 'react';
import { Person } from '../types';
import { fetchPersons } from '../api';

export function usePersons() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        fetchPersons()
            .then((data) => {
                if (isMounted) {
                    setPersons(data);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('Unknown error'));
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return { persons, loading, error };
}
