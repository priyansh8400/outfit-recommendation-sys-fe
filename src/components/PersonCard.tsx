import React from 'react';
import { Person } from '../types';
import { useNavigate } from 'react-router-dom';

interface PersonCardProps {
    person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card person-card"
            onClick={() => navigate(`/outfit/${person.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/outfit/${person.id}`);
                }
            }}
        >
            <div className="card-image-wrapper">
                <img src={person.image_url} alt={person.name} loading="lazy" />
            </div>
            <div className="card-content">
                <h3 className="card-title">{person.name}</h3>
                <span className="badge">{person.gender}</span>
            </div>
        </div>
    );
};

export default PersonCard;
