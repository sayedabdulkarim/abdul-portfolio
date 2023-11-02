import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Row, Col, FormCheck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTheme } from "../../slices/settings/settingSlice";
import { toggleTheme } from "../../utils/settings";

const Settings = ({}) => {
  //misc
  const dispatch = useDispatch();
  const { selectedTheme } = useSelector((state) => state.settingsReducer);

  //state
  const [theme, setTheme] = useState(null);

  //func
  const handleChange = (e) => {
    const value = e.target.value;
    setTheme(value);
    toggleTheme(value);
    dispatch(setSelectedTheme(value));
  };

  return (
    <FormContainer>
      <Row className="mb-3">
        <Form.Group as={Col} md="3">
          <Form.Label htmlFor="inputPassword5" className="title_text">
            Language
          </Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label htmlFor="inputPassword5">Font Size</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Label htmlFor="inputPassword5">Theme</Form.Label>

        <Form.Group as={Col} md="2">
          <FormCheck
            type={"radio"}
            label={"Dark"}
            onChange={handleChange}
            value={"dark"}
            checked={theme === "dark"}
          />
        </Form.Group>

        <Form.Group as={Col} md="2">
          <FormCheck
            type={"radio"}
            label={"Light"}
            onChange={handleChange}
            value={"light"}
            checked={theme === "light"}
          />
        </Form.Group>

        <Form.Group as={Col} md="2">
          <FormCheck
            type={"radio"}
            label={"White"}
            onChange={handleChange}
            value={"white"}
            checked={theme === "white"}
          />
        </Form.Group>
      </Row>
    </FormContainer>
  );
};

export default Settings;
