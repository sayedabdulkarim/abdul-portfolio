import { useEffect } from "react";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { selectedTheme } = useSelector((state) => state.settingsReducer);

  // useEffect(() => {
  //   navigate("/home");
  // }, [navigate]);
  return (
    <>
      <ToastContainer />
      <Header />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
