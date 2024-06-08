import {
  faEnvelope,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  ListGroup,
  Card,
} from "react-bootstrap";
import {
  faArrowUpLong,
  faHome,
  faLock,
  faShopLock,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  fetchMyProfile,
  updateProfile,
} from "../../../redux/action/userAction";
import Loader from "../../../Loader";
import { Link, useNavigate } from "react-router-dom";
import { mdiNumeric3CircleOutline } from "@mdi/js";
import { logout } from "../../../redux/action/userAction";
const ProfilePage = (props) => {
  const id = localStorage.getItem("userId");
  const [imageUrl, setImageUrl] = useState(
    `http://localhost:8000/api/user//image/${id}`
  );
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/rockstar-lift/login");
    }
  }, []);
  const navigate = useNavigate();
  const { profile, loading } = props;
  const [load, setLoad] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePic: null,
  });
  const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    setForm({
      ...form,
      profilePic: profilePic,
    });
  }, [profilePic]);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(event.target.files);
    const reader = new FileReader();
    setForm({
      ...form,
      profilePic: event.target.files[0],
    });
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    props.fetchMyProfile();
  }, []);
  useEffect(() => {
    setForm({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      email: profile?.email,
      phone: profile?.phone,
    });
  }, [profile]);
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      profilePic: profilePic,
    });
    props.updateProfile(form, navigate);
  };
  const handleLogout = () => {
    props.logout(navigate);
  };
  return (
    <div className="my_profile">
      <div className="w-100">
        <Container>
          <div className="header">
            <h2>My Profile</h2>
            <span>Manage your profile information</span>
          </div>
          <Row>
            <Col lg={3}>
              <div className="manage_account text-start">
                <ListGroup variant="flush">
                  <ListGroup.Item>Manage Account</ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/rockstar-lift/user/profile">
                      <i>
                        <FontAwesomeIcon icon={faUser} />
                      </i>
                      Profile
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/rockstar-lift/Show/my-offers">
                      <i>
                        <FontAwesomeIcon icon={faStar} />
                      </i>
                      Offers Sent
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/rockstar-lift/Show/my-requests">
                      <i>
                        <FontAwesomeIcon icon={faHome} />
                      </i>
                      Address Requests
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/rockstar-lift/Show/my-messages">
                      <i>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </i>
                      Messages
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
                <hr />

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <i>
                      <FontAwesomeIcon icon={faUser} />
                    </i>
                    <Link to="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col lg={6}>
              <div className="profile_data">
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.firstName}
                        name="firstName"
                        onChange={onInputChange}
                        placeholder="First Name"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.lastName}
                        name="lastName"
                        onChange={onInputChange}
                        placeholder="Last Name"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.email}
                        name="email"
                        onChange={onInputChange}
                        placeholder="Email"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.phone}
                        name="phone"
                        onChange={onInputChange}
                        placeholder="Phone"
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Col lg={6}>
                      <div className="save_changes">
                        <Button
                          className="btn btn-primary btn-block w-100 mb-2"
                          variant="primary"
                          type="submit"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            <Col lg={3}>
              <div className="profile_img">
                <Card
                  className="text-center"
                  style={{
                    border: "none",
                    padding: "20px",
                  }}
                >
                  <Card.Img
                    src={imageUrl}
                    alt="Profile Picture"
                    style={{
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      display: "block",
                      margin: "0px auto",
                    }}
                  />
                  <Card.Body className="btnChoose">
                    <Button
                      variant="primary"
                      onClick={() =>
                        document.getElementById("profilePic").click()
                      }
                      style={{ width: "100%" }}
                    >
                      <FontAwesomeIcon icon={faUpload} /> Choose New Photo
                    </Button>
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.auth.profile?.profile,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, {
  fetchMyProfile,
  updateProfile,
  logout,
})(ProfilePage);
