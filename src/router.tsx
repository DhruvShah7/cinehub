import { lazy } from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import CustomLayout from "./HOCs/Layout";
import { MOVIES, ROOT } from "./constants/internal-routes";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Movies = lazy(() => import("./pages/movies"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<CustomLayout />}>
        <Route path={ROOT} element={<Dashboard />} />
        <Route path={MOVIES} element={<Movies />} />
      </Route>
    </Route>,
  ),
);

export default router;
