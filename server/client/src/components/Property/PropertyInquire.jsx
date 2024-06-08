import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { sendMessage } from "../../redux/action/messageAction";
import { connect } from "react-redux";
import Properties from "./../Landing/Properties";

const PropertyInquire = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState({
    content: "",
    receiver: props.property.user,
    property: props.property._id,
  });

  const onFormSubmit = (event) => {
    const x = event.currentTarget;
    event.preventDefault();
    props.sendMessage(form);
  };
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };
  return (
    <div className="inquire">
      <Button
        className="w-100 w-100 mt-2 border-0 mb-5"
        onClick={() => setModalShow(true)}
      >
        Send Message
      </Button>

      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Send</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Row className="mb-3">
              <Form.Group
                xs={12}
                as={Col}
                controlId="formGridDesc"
                className="mt-3"
              >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Content"
                  value={form.content}
                  onChange={onInputChange}
                  name="content"
                />
              </Form.Group>
            </Row>
            <Button
              className="submit w-100"
              type="submit"
              onClick={() => setModalShow(false)}
            >
              Send
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  property: state.properties.property,
  loading: state.message.loading,
  error: state.message.error,
});
export default connect(mapStateToProps, { sendMessage })(PropertyInquire);
