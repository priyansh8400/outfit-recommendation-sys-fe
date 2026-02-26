import React from 'react';
import { Wearing } from '../types';
import ClothesCard from './ClothesCard';

interface OutfitSectionProps {
    wearing: Wearing;
}

const OutfitSection: React.FC<OutfitSectionProps> = ({ wearing }) => {
    return (
        <section className="outfit-section">
            <h2 className="section-title">Current Outfit</h2>
            <div className="outfit-grid">
                <ClothesCard clothes={wearing.top} />
                <ClothesCard clothes={wearing.bottom} />
                <ClothesCard clothes={wearing.shoes} />
            </div>
        </section>
    );
};

export default OutfitSection;
