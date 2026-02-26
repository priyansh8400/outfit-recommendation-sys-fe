import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GenderSelectPage from './pages/GenderSelectPage';
import HomePage from './pages/HomePage';
import OutfitPage from './pages/OutfitPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenderSelectPage />} />
        <Route path="/outfits/:gender" element={<HomePage />} />
        <Route path="/outfit/:personId/:outfitId" element={<OutfitPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
