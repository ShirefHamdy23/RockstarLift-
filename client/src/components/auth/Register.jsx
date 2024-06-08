import Auth from "./Auth";
import { useState } from "react";
import { connect } from "react-redux";
import { registration } from "../../redux/action/userAction";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = (props) => {
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = new FormData();
    user.append("firstName", registerInfo.firstName);
    user.append("lastName", registerInfo.lastName);
    user.append("email", registerInfo.email);
    user.append("phone", registerInfo.phone);
    user.append("age", registerInfo.age);
    user.append("password", registerInfo.password);
    user.append("profilePic", registerInfo.profilePic);

    props.registration(user, navigate);
  };
  const handlePhotoChange = (e) => {
    setRegisterInfo({
      ...registerInfo,
      profilePic: e.target.files[0],
    });
  };
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setRegisterInfo({
      ...registerInfo,
      [evt.target.name]: value,
    });
  };

  return (
    <>
      <Auth
        info={registerInfo}
        onInputChange={onInputChange}
        handlePhotoChange={handlePhotoChange}
        handleSubmit={handleSubmit}
        header={"Sign Up Now!"}
        inputsName={[
          { name: "first Name", type: "text", value: "firstName" },
          { name: "last Name", type: "text", value: "lastName" },
          { name: "email", type: "email", value: "email" },
          { name: "age", type: "text", value: "age" },
          { name: "phone", type: "text", value: "phone" },
          {
            name: "Profile",
            type: "file",
            fileVal: "profilePic",
            value: "profilePic",
          },

          { name: "password", type: "password", value: "password" },
          {
            name: "confirmPassword",
            type: "password",
            value: "confirmPassword",
          },
        ]}
        buttonTitle="Sign Up"
      />
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { registration })(Register);
