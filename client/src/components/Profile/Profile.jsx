import { useEffect, useState } from "react";
import { Col, Form, Row, Image, Button } from "react-bootstrap";
import photo from "../../assets/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHg1NjkzMjEtaW1hZ2VfMS1renAycXhwOC5wbmc.webp";
import defaultImg from "../../assets/IMG-20200110-WA0069.jpg";
import { fetchMyProfile } from "../../redux/action/userAction";
import { connect } from "react-redux";
import Loader from "../../Loader";
const Profile = (props) => {
  const [load, setLoad] = useState(true);
  const [file, setFile] = useState();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    status: "",
  });
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };
  const onFormSubmit = (event) => {
    const x = event.currentTarget;
    event.preventDefault();
    if (x.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const { profile, loading } = props;

  useEffect(() => {
    setForm({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      email: profile?.email,
      phone: profile?.phone,
      age: profile?.age,
      status: profile?.status,
    });
  }, [profile]);

  if (loading) {
    return <Loader load={true} />;
  }

  return (
    <div>
      <>
        <div className="prof_header ">
          <h3>My Profile</h3>
        </div>
        <div className="main_section">
          <div className="profile">
            <Row>
              <Col md={12}>
                <div className="form_layout">
                  <div className="img_container">
                    <input
                      type="file"
                      onChange={handleChange}
                      value={file}
                      style={{ display: "none" }}
                      id="fileInput"
                    />
                    <img
                      src={file || defaultImg}
                      alt="Upload"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    />
                  </div>
                  <Form onSubmit={onFormSubmit}>
                    <Row>
                      <Col md={3}>
                        <Form.Group controlId="name">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={onInputChange}
                            name="firstName"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="name">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={onInputChange}
                            name="lastName"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            value={form.email}
                            onChange={onInputChange}
                            name="email"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="phone" className="mt-2">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={onInputChange}
                            name="phone"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="age" className="mt-2">
                          <Form.Label>Age</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Age"
                            value={form.age}
                            onChange={onInputChange}
                            name="age"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="status" className="mt-2">
                          <Form.Label>Status</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Status"
                            value={form.status}
                            onChange={onInputChange}
                            name="status"
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <div className="update_btn mt-3">
                        <Button className="w-30 w-30" type="submit">
                          Update
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.auth.profile?.profile,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, {
  fetchMyProfile,
})(Profile);
