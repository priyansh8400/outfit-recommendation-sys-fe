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
        <div className="container">
            <button className="btn btn-secondary back-btn" onClick={() => navigate('/')}>
                ← Back to Gender Selection
            </button>
            <header className="page-header">
                <h1 className="main-title">{person.name}'s Virtual Try-On</h1>
                <p className="subtitle">Select an outfit combination to see details & styling.</p>
            </header>

            <div className="person-grid">
                {outfits.map((outfit, index) => (
                    <div
                        key={outfit.id}
                        className="card person-card"
                        onClick={() => navigate(`/outfit/${person.id}/${outfit.id}`)}
                    >
                        <div className="card-image-wrapper">
                            <img src={outfit.image_url || person.image_url} alt={`${person.name} Outfit ${index + 1}`} loading="lazy" />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Outfit #{index + 1}</h3>
                            <span className="badge">{outfit.outfitType === 'dress' ? 'Dress Combo' : 'Casual Mix'}</span>
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {outfit.outfitType === 'dress' ? (
                                    <>Includes dress & shoes</>
                                ) : (
                                    <>Includes top, bottom & shoes</>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
