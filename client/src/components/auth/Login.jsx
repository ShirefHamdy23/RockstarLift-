import { useState } from "react";
import Auth from "./Auth";
import { login } from "../../redux/action/userAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function Login(props) {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    props.login(loginInfo, navigate);
  };
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setLoginInfo({
      ...loginInfo,
      [evt.target.name]: value,
    });
  };
  return (
    <>
      <Auth
        info={loginInfo}
        onInputChange={onInputChange}
        handleSubmit={handleSubmit}
        header={
          <>
            Welcome Back ! <br /> Sign in to continue.
          </>
        }
        inputsName={[
          { name: "email", type: "email", value: "email" },
          { name: "password", type: "password", value: "password" },
        ]}
        buttonTitle="Sign In"
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Login);
