import { Routes, Route, Navigate } from 'react-router-dom';
import DetailsPage from '@/pages/DetailsPage';
import HomePage from '@/pages/HomePage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/character/:id" element={<DetailsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
