import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import RouteLoader from "../components/RouteLoader";

// Minimum delay for loader visibility (in ms)
const MIN_LOADING_TIME = 800;

// Helper function to add minimum delay to lazy imports
const lazyWithDelay = (importFunc) => {
  return lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME)),
    ]).then(([module]) => module)
  );
};

// Lazy load all screens with minimum delay
const HomeScreen = lazyWithDelay(() => import("../screens/auth/Home"));
const ProjectsScreen = lazyWithDelay(() => import("../screens/auth/Projects2"));
const AppsScreen = lazyWithDelay(() => import("../screens/auth/Apps"));
const BlogScreen = lazyWithDelay(() => import("../screens/auth/Blog2"));
const AboutScreen = lazyWithDelay(() => import("../screens/auth/About"));
const ContactScreen = lazyWithDelay(() => import("../screens/auth/Contact"));

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <Suspense fallback={<RouteLoader />}>
                <HomeScreen />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={<RouteLoader />}>
                <ProjectsScreen />
              </Suspense>
            }
          />
          <Route
            path="apps"
            element={
              <Suspense fallback={<RouteLoader />}>
                <AppsScreen />
              </Suspense>
            }
          />
          <Route
            path="blog"
            element={
              <Suspense fallback={<RouteLoader />}>
                <BlogScreen />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<RouteLoader />}>
                <AboutScreen />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<RouteLoader />}>
                <ContactScreen />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<h1>404 Component</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
