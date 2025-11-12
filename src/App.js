import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChatBot from "./components/Chat/ChatBot";
// import "react-toastify/dist/ReactToastify.css";

const App = () => {

  // useEffect(() => {
  //   navigate("/home");
  // }, [navigate]);
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="my-2">
        <Outlet />
      </div>
      <ChatBot />
    </>
  );
};

export default App;
