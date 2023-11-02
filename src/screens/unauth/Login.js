import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/users/authApiSlice";
import { setCredentials } from "../../slices/users/authSlice";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";

const LoginScreen = () => {
  //misc
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.authReducer);

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //queries n mutatios
  const [login, { isLoading }] = useLoginMutation();

  //func
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(setCredentials(data));
    toast.success("Succesfully signed in.");
    // enable for the api
    // try {
    //   const res = await login({ email, password }).unwrap();
    //   dispatch(setCredentials({ ...res }));
    //   navigate("/settings");
    //   toast.success(res);
    // } catch (err) {
    //   toast.error(err?.data?.message ?? "Something went wrong.");
    // }
  };

  //async
  useEffect(() => {
    if (userInfo) {
      navigate("/settings");
    }
  }, [navigate, userInfo]);

  return (
    <FormContainer>
      <h1 className="title_text">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={!email && !password}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Sign In
        </Button>
      </Form>

      {/* {isLoading && <Loader />} */}

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
