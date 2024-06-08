import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const CreateOffer = () => {
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState({
    buyerName: "",
    type: "",
    emd: "",
    financing: "",
    settlementDate: "",
    titleCompany: "",
    property: "",
    price: "",
    status: "",
    buyerCompany: "",
    creationDate: "",
  });

  const onFormSubmit = (event) => {
    const x = event.currentTarget;
    event.preventDefault();
    if (x.checkValidity() === false) {
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
    <div className="buyer_form">
      <Button variant="primary" onClick={() => setModalShow(true)}>
        + Create Offer
      </Button>

      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            CREATE NEW OFFER
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group xs={12} as={Col} controlId="buyerName">
                  <Form.Label>Buyer Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buyer Name"
                    value={form.name}
                    onChange={onInputChange}
                    name="buyerName"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    onChange={onInputChange}
                    value={form.type}
                    name="type"
                  >
                    <option value="offer">Offer</option>
                    <option value="buyNow">BuyNow</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="emd">
                  <Form.Label>EMD</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="EMD Amount"
                    value={form.email}
                    onChange={onInputChange}
                    name="emd"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="financing">
                  <Form.Label>Financing</Form.Label>
                  <Form.Select
                    onChange={onInputChange}
                    value={form.financing}
                    name="financing"
                  >
                    <option value="cash">Cash</option>
                    <option value="lender">Lender</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="settlementDate">
                  <Form.Label>Settlement Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Settlement Date"
                    value={form.settlementDate}
                    onChange={onInputChange}
                    name="settlementDate"
                  />
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="titleCompany">
                  <Form.Label>Title Company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title Company"
                    value={form.titleCompany}
                    onChange={onInputChange}
                    name="titleCompany"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group xs={12} as={Col} controlId="property">
                  <Form.Label>Property</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Property"
                    value={form.property}
                    onChange={onInputChange}
                    name="property"
                  />
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Price"
                    value={form.price}
                    onChange={onInputChange}
                    name="price"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    onChange={onInputChange}
                    value={form.status}
                    name="status"
                  >
                    <option value="new">New</option>
                    <option value="confirmedPof">Confirmed POF</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="buyerCompany">
                  <Form.Label>Buyer Company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buyer Company"
                    value={form.buyerCompany}
                    onChange={onInputChange}
                    name="buyerCompany"
                  />
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="creationDate">
                  <Form.Label>Creation Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Creation Date"
                    value={form.creationDate}
                    onChange={onInputChange}
                    name="creationDate"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Button
                  className="submit"
                  style={{ width: "100%" }}
                  type="submit"
                  onClick={() => setModalShow(false)}
                >
                  Save Offer
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateOffer;
