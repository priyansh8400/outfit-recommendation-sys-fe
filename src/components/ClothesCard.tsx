import React from 'react';
import { Clothes } from '../types';

interface ClothesCardProps {
    clothes: Clothes;
}

const ClothesCard: React.FC<ClothesCardProps> = ({ clothes }) => {
    const cardContent = (
        <>
            <div className="card-image-wrapper clothes-img-wrapper">
                <img src={clothes.image_url} alt={clothes.name} loading="lazy" />
            </div>
            <div className="card-content">
                <div className="clothes-header">
                    <span className="badge">{clothes.category}</span>
                    <span className="badge outline">{clothes.sub_category}</span>
                </div>
                <h3 className="card-title clothes-title" title={clothes.name}>
                    {clothes.name}
                </h3>
                <div className="clothes-meta">
                    {clothes.price !== undefined && clothes.price !== null && (
                        <span className="meta-item price" style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
                            ₹{clothes.price.toLocaleString('en-IN')}
                        </span>
                    )}
                    {clothes.brand && <span className="meta-item">{clothes.brand}</span>}
                    {clothes.color && <span className="meta-item color-meta">
                        <span className="color-dot" style={{ backgroundColor: clothes.color.toLowerCase() }}></span>
                        {clothes.color}
                    </span>}
                </div>
                {clothes.product_url && (
                    <div className="product-link-hint">
                        View on Store ↗
                    </div>
                )}
            </div>
        </>
    );

    if (clothes.product_url) {
        return (
            <a
                href={clothes.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card clothes-card clothes-card-link"
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                {cardContent}
            </a>
        );
    }

    return (
        <div className="card clothes-card">
            {cardContent}
        </div>
    );
};

export default ClothesCard;
