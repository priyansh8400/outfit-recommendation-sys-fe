import React from 'react';
import { Clothes } from '../types';
import ClothesCard from './ClothesCard';

interface RecommendationSectionProps {
    title: string;
    items: Clothes[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ title, items }) => {
    if (items.length === 0) return null;

    return (
        <section className="recommendation-section">
            <h2 className="section-title">{title}</h2>
            <div className="horizontal-scroll">
                {items.map((item) => (
                    <ClothesCard key={item.id} clothes={item} />
                ))}
            </div>
        </section>
    );
};

export default RecommendationSection;
