import React from 'react';
import { useNavigate } from 'react-router-dom';

const GenderSelectPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <header className="page-header" style={{ marginBottom: '4rem' }}>
                <h1 className="main-title" style={{ fontSize: '3rem' }}>Virtual Try-On</h1>
                <p className="subtitle" style={{ fontSize: '1.25rem' }}>Select a category to explore different outfits</p>
            </header>

            <div className="gender-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '900px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div
                    className="card gender-card"
                    onClick={() => navigate('/outfits/male')}
                    style={{ cursor: 'pointer', textAlign: 'center', padding: '3rem 2rem' }}
                >
                    <div style={{ marginBottom: '1rem' }}>
                        <img
                            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"
                            alt="Men"
                            style={{ width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto', display: 'block' }}
                        />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Men</h2>
                </div>

                <div
                    className="card gender-card"
                    onClick={() => navigate('/outfits/female')}
                    style={{ cursor: 'pointer', textAlign: 'center', padding: '3rem 2rem' }}
                >
                    <div style={{ marginBottom: '1rem' }}>
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
                            alt="Women"
                            style={{ width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto', display: 'block' }}
                        />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Women</h2>
                </div>
            </div>
        </div>
    );
};

export default GenderSelectPage;
