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

    if (!data?.person) {
        return (
            <div className="container">
                <ErrorMessage message="Person not found." />
            </div>
        );
    }

    return (
        <div className="container">
            <button className="btn btn-secondary back-btn" onClick={() => navigate(`/outfits/${data.person.gender}`)}>
                ← Back to Outfits
            </button>

            <div className="profile-header">
                <img
                    src={data.wearing && 'image_url' in data.wearing && typeof data.wearing.image_url === 'string' ? data.wearing.image_url : data.person.image_url}
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
    );
};

export default OutfitPage;
