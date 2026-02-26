import React from 'react';
import { usePersons } from '../hooks/usePersons';
import PersonCard from '../components/PersonCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const HomePage: React.FC = () => {
    const { persons, loading, error } = usePersons();

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="container">
                <ErrorMessage message={error.message} onRetry={() => window.location.reload()} />
            </div>
        );
    }

    return (
        <div className="container">
            <header className="page-header">
                <h1 className="main-title">Fashion Recommendations</h1>
                <p className="subtitle">Select a model to view their outfit and see recommendations.</p>
            </header>

            <div className="person-grid">
                {persons.map((person) => (
                    <PersonCard key={person.id} person={person} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
