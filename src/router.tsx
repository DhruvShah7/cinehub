import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App";
import CustomLayout from "./HOCs/Layout";
import { MOVIES, ROOT, TV_SHOWS } from "./constants/internal-routes";
import { ErrorFallback } from "./pages/error-fallback";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Movies = lazy(() => import("./pages/movies"));
const TVShows = lazy(() => import("./pages/tvs"));
const NotFound = lazy(() => import("./pages/404"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} errorElement={<ErrorFallback />}>
      <Route element={<CustomLayout />} errorElement={<ErrorFallback />}>
        <Route path={ROOT} element={<Dashboard />} />
        <Route path={MOVIES} element={<Movies />} />
        <Route path={TV_SHOWS} element={<TVShows />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all 404 route */}
      </Route>
    </Route>
  )
);

export default router;
