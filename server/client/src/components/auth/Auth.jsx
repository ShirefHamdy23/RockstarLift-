import { Container, Form, Row } from "react-bootstrap";
import UserInput from "./UserInput";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Loader from "../../Loader";
import { useState, useEffect } from "react";
import auth from "../../assets/auth.png";
import { useNavigate } from "react-router-dom";

const Auth = ({
  info,
  onInputChange,
  handleSubmit,
  header,
  inputsName,
  buttonTitle,
  handlePhotoChange,
}) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/rockstar-lift");
    }
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1800);
  }, []);
  const iterateTest = (array) => {
    const fields = [];

    if (array.length !== 0) {
      for (let i = 0; i < array.length; i++) {
        fields.push(
          <UserInput
            key={i}
            type={array[i].type}
            placeholder={
              array[i].name[0].toUpperCase() + array[i].name.substring(1)
            }
            id={array[i].type === "profilePic" ? "file" : array[i].value}
            name={array[i].type === "profilePic" ? "file" : array[i].value}
            value={array[i].type === "file" ? "" : info[array[i].value]}
            onChange={
              array[i].type === "file" ? handlePhotoChange : onInputChange
            }
          />
        );
      }
    }
    return fields;
  };
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${auth})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {load ? (
        <Loader load={load} />
      ) : (
        <Container className="auth d-flex justify-content-center align-items-center">
          <div className="form_container">
            <div className="header">
              <p>{header}</p>
            </div>
            <div className="content">
              <Form className="register" onSubmit={handleSubmit}>
                {iterateTest(inputsName)}
                <Button
                  className="btn btn-primary btn-block w-100 mb-2"
                  variant="primary"
                  type="submit"
                >
                  {buttonTitle}
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

Auth.propTypes = {
  info: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  header: PropTypes.object,
  inputsName: PropTypes.array.isRequired,
  handlePhotoChange: PropTypes.func,
};
export default Auth;
