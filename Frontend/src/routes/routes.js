import { BrowserRouter as Router, Routes } from "react-router-dom";
import { PublicRoutes } from './PublicRoutes.js';
import { PrivateRoutes } from './PrivateRoutes.js';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {PublicRoutes()}
        {PrivateRoutes()}
      </Routes>
    </Router>
  );
}
