import { Person, OutfitFullResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchPersons(): Promise<Person[]> {
    const response = await fetch(`${API_URL}/persons`);
    if (!response.ok) {
        throw new Error('Failed to fetch persons');
    }
    return response.json();
}

export async function fetchOutfitFull(personId: string): Promise<OutfitFullResponse> {
    const response = await fetch(`${API_URL}/outfit/${personId}/full`);
    if (!response.ok) {
        throw new Error('Failed to fetch outfit details');
    }
    return response.json();
}
