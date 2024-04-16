import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import CustomLayout from "./HOCs/Layout";
const Dashboard = lazy(() => import("./pages/dashboard"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<CustomLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Route>,
  ),
);

export default router;
