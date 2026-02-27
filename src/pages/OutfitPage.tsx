import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutfitFull } from '../hooks/useOutfitFull';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import OutfitSection from '../components/OutfitSection';
import RecommendationSection from '../components/RecommendationSection';

const OutfitPage: React.FC = () => {
    const { personId, outfitId } = useParams<{ personId: string, outfitId: string }>();
    const navigate = useNavigate();
    const { data, loading, error } = useOutfitFull(personId, outfitId);

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="container">
                <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                    ← Back to Outfits
                </button>
                <ErrorMessage message={error.message} onRetry={() => window.location.reload()} />
            </div>
        );
    }

    if (!data || !data.person) {
        return (
            <div className="container">
                <ErrorMessage message="Person not found." />
            </div>
        );
    }

    return (
        <div className="lookbook-container">
            {/* Top Navigation Bar */}
            <nav className="lookbook-nav">
                <div className="nav-brand" onClick={() => navigate(`/outfits/${data.person.gender}`)} style={{ cursor: 'pointer' }}>LOOKBOOK</div>
                <div className="nav-collection">2026 COLLECTION</div>
            </nav>

            <div className="outfit-detail-layout">
                {/* Left Column: Big Image & Info */}
                <div className="outfit-detail-image-col">
                    <button className="btn btn-secondary back-btn" onClick={() => navigate(`/outfits/${data.person.gender}`)} style={{ border: 'none', background: 'transparent', padding: 0, fontWeight: 500 }}>
                        ← Back to {data.person.gender === 'male' ? 'Men' : 'Women'}
                    </button>

                    <div className="large-outfit-wrapper">
                        <img
                            src={data.wearing && 'image_url' in data.wearing && typeof data.wearing.image_url === 'string' ? data.wearing.image_url : data.person.image_url}
                            alt="Outfit"
                            className="large-outfit-image"
                        />
                    </div>
                </div>

                {/* Right Column: Components & Recommendations */}
                <div className="outfit-detail-content-col">

                    {!data.wearing ? (
                        <div className="empty-state">No outfit data available for this model.</div>
                    ) : (
                        <OutfitSection wearing={data.wearing} />
                    )}

                    {data.recommendations && (
                        <div className="recommendations-container" style={{ marginTop: '4rem' }}>
                            <div style={{
                                backgroundColor: '#000',
                                color: '#fff',
                                padding: '1.5rem',
                                textAlign: 'center',
                                fontSize: '1.8rem',
                                fontWeight: 'bold',
                                marginBottom: '2.5rem',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '2px'
                            }}>
                                Try It on Yourself!
                            </div>
                            <h2 className="recommendations-header" style={{ fontFamily: "'Playfair Display', serif" }}>Style Recommendations</h2>
                            {data.wearing?.outfitType === 'dress' ? (
                                <RecommendationSection title="Similar Dresses" items={data.recommendations.dress || []} />
                            ) : (
                                <>
                                    <RecommendationSection title="Similar Tops" items={data.recommendations.top || []} />
                                    <RecommendationSection title="Similar Bottoms" items={data.recommendations.bottom || []} />
                                </>
                            )}
                            <RecommendationSection title="Similar Shoes" items={data.recommendations.shoes || []} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OutfitPage;
