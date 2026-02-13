import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChatBot from "./components/Chat/ChatBot";
import InitialLoader from "./components/InitialLoader";
import RouteLoader from "./components/RouteLoader";
// import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLanguageChanging } = useSelector((state) => state.settingsReducer);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="app-wrapper">
      {isLoading && <InitialLoader onLoadingComplete={handleLoadingComplete} />}
      {isLanguageChanging && <RouteLoader />}
      <ToastContainer />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
