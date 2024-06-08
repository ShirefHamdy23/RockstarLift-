import { useState } from "react";
import { Button, Modal, Form, Row, Col, Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { makeOffer } from "../../redux/action/OfferActions";
import { ToastContainer } from "react-toastify";

const MakeOffer = (props) => {
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    EMD: "",
  });

  const onFormSubmit = (event) => {
    const x = event.currentTarget;
    event.preventDefault();
    const offerData = {
      ...form,
      property: id,
      seller: props.sellerId,
    };
    props.makeOffer(offerData);
  };
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };
  return (
    <div className="make_offer">
      <Button
        className="w-100 w-100 mt-4 border-0"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Make an Offer
      </Button>

      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="modalTitle"
          >
            Make Offer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Row className="mb-3">
              <Form.Group xs={12} as={Col} controlId="formGridamount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="400$"
                  value={form.amount}
                  onChange={onInputChange}
                  name="amount"
                />
              </Form.Group>
              <Form.Group
                xs={12}
                as={Col}
                controlId="formGridEMD"
                className="mt-3"
              >
                <Form.Label>EMD</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="EMD"
                  value={form.EMD}
                  onChange={onInputChange}
                  name="EMD"
                />
              </Form.Group>
            </Row>
            <div className="offer_btns d-flex justify-content-between">
              <Button
                type="submit"
                className="w-50"
                onClick={() => setModalShow(false)}
              >
                Send
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer
        style={{
          zIndex: 9999123123,
        }}
      />
    </div>
  );
};

export default connect(null, { makeOffer })(MakeOffer);
