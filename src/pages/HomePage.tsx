import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePersonOutfits } from '../hooks/usePersonOutfits';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const HomePage: React.FC = () => {
    const { gender } = useParams<{ gender: string }>();
    const navigate = useNavigate();
    const { data, loading, error } = usePersonOutfits(gender);

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="container">
                <button className="btn btn-secondary back-btn" onClick={() => navigate('/')}>
                    ← Back to Gender Selection
                </button>
                <ErrorMessage message={error.message} onRetry={() => window.location.reload()} />
            </div>
        );
    }

    if (!data?.person || !data.outfits) {
        return (
            <div className="container">
                <button className="btn btn-secondary back-btn" onClick={() => navigate('/')}>
                    ← Back to Gender Selection
                </button>
                <div className="empty-state">No outfits found for this selection.</div>
            </div>
        );
    }

    const { person, outfits } = data;

    return (
        <div className="lookbook-container">
            {/* Top Navigation Bar */}
            <nav className="lookbook-nav">
                <div className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>LOOKBOOK</div>
                <div className="nav-collection">2026 COLLECTION</div>
            </nav>

            {/* Header Section */}
            <header className="lookbook-header">
                <h1 className="lookbook-title">
                    Curated outfits,<br />
                    effortless style.
                </h1>
                <p className="lookbook-subtitle">
                    Explore our hand-picked selection of complete looks. Click any<br />
                    model to discover each piece and find similar styles.
                </p>
            </header>

            {/* Featured Looks Divider */}
            <div className="featured-divider">
                <span className="featured-text">FEATURED LOOKS</span>
                <span className="styles-count">{outfits.length} styles</span>
            </div>

            {/* Grid */}
            <div className="lookbook-grid">
                {outfits.map((outfit, index) => (
                    <div
                        key={outfit.id}
                        className="lookbook-card"
                        onClick={() => navigate(`/outfit/${person.id}/${outfit.id}`)}
                    >
                        <div className="lookbook-image-wrapper">
                            <img src={outfit.image_url || person.image_url} alt={`${person.name} Outfit ${index + 1}`} loading="lazy" />
                        </div>
                        <div className="lookbook-card-footer">
                            <span className="lookbook-gender">{person.gender.toUpperCase()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
