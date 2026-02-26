import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutfitFull } from '../hooks/useOutfitFull';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import OutfitSection from '../components/OutfitSection';
import RecommendationSection from '../components/RecommendationSection';

const OutfitPage: React.FC = () => {
    const { personId } = useParams<{ personId: string }>();
    const navigate = useNavigate();
    const { data, loading, error } = useOutfitFull(personId);

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="container">
                <button className="btn btn-secondary back-btn" onClick={() => navigate('/')}>
                    ← Back to Models
                </button>
                <ErrorMessage message={error.message} onRetry={() => window.location.reload()} />
            </div>
        );
    }

    if (!data?.person) {
        return (
            <div className="container">
                <ErrorMessage message="Person not found." />
            </div>
        );
    }

    return (
        <div className="container">
            <button className="btn btn-secondary back-btn" onClick={() => navigate('/')}>
                ← Back to Models
            </button>

            <div className="profile-header">
                <img
                    src={data.person.image_url}
                    alt={data.person.name}
                    className="profile-image"
                />
                <div>
                    <h1 className="profile-title">{data.person.name}</h1>
                    <span className="badge">{data.person.gender}</span>
                </div>
            </div>

            {!data.wearing ? (
                <div className="empty-state">No outfit data available for this model.</div>
            ) : (
                <OutfitSection wearing={data.wearing} />
            )}

            {data.recommendations && (
                <div className="recommendations-container">
                    <h2 className="recommendations-header">Style Recommendations</h2>
                    <RecommendationSection title="Similar Tops" items={data.recommendations.top} />
                    <RecommendationSection title="Similar Bottoms" items={data.recommendations.bottom} />
                    <RecommendationSection title="Similar Shoes" items={data.recommendations.shoes} />
                </div>
            )}
        </div>
    );
};

export default OutfitPage;
