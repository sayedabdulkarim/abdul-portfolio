import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import HomeScreen from "../screens/auth/Home";
import AboutScreen from "../screens/auth/About";
import ProjectScreen from "../screens/auth/Projects";
import ContactScreen from "../screens/auth/Contact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/project" element={<ProjectScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="*" element={<h1>404 Component</h1>} />
    </Route>
  )
);
