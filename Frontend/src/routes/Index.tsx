import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import BlogPage from '../pages/BlogPage';
import PrivateRoute from './PrivateRoute';

const Index = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route
      path="/blog"
      element={
        <PrivateRoute>
          <BlogPage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default Index;
