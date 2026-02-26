import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OutfitPage from './pages/OutfitPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/outfit/:personId" element={<OutfitPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
