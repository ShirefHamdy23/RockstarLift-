import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import mail from "../../assets/Email-PNG-Clipart.png";
import { useState } from "react";
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  const handleSubmit = (event) => {
    const formsub = event.currentTarget;
    event.preventDefault();
    if (formsub.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };
  return (
    <div className="contactUs">
      <Container>
        <div className="cont d-flex justify-content-center align-content-center">
          <Col md={6} sm={12} xs={12}>
            <div className="image_contact">
              <Image src={mail} />
            </div>
          </Col>
          <Col>
            <div className="contact_form">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={onInputChange}
                    value={form.name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    onChange={onInputChange}
                    value={form.phone}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={onInputChange}
                    value={form.email}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="msg">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="msg"
                    onChange={onInputChange}
                    value={form.msg}
                  />
                </Form.Group>
                <div className="contact_btn">
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
