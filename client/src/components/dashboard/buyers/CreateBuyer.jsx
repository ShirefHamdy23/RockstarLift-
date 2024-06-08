import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addNewBuyer } from "./../../../redux/action/buyerAction";
import { ToastContainer } from "react-toastify";

const userTypes = [
  "Buy and Hold Investor",
  "Fix and Flip Investor",
  "Wholesaler",
  "Real Estate Developer",
  "Realtor",
  "Other",
];

const CreateBuyer = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    investorType: "",
    CreatedAt: "",
  });
  const [buyRange, setBuyRange] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const onFormSubmit = (event) => {
    event.preventDefault();
    const returnedTarget = Object.assign(form, {
      buyBoxRange: buyRange,
    });
    props.addNewBuyer(returnedTarget);
  };
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  const onBuyRangeChange = (evt) => {
    const value = evt.target.value;
    setBuyRange({
      ...buyRange,
      [evt.target.name]: value,
    });
  };

  return (
    <div className="buyer_form">
      <Button variant="primary" onClick={() => setModalShow(true)}>
        + Create Buyer
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
            CREATE NEW BUYER
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Row className="mb-3">
              <Form.Group xs={12} as={Col} controlId="formGridText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={form.fullName}
                  onChange={onInputChange}
                  name="fullName"
                />
              </Form.Group>
              <Form.Group xs={12} as={Col} controlId="formGridText">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={onInputChange}
                  name="email"
                />
              </Form.Group>
              <Form.Group xs={12} as={Col} controlId="formGridText">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  value={form.phoneNumber}
                  onChange={onInputChange}
                  name="phoneNumber"
                />
              </Form.Group>
              <Form.Group xs={6} as={Col} controlId="formGridText">
                <Form.Label>Min Range</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Min Range"
                  value={buyRange.minPrice}
                  onChange={onBuyRangeChange}
                  name="minPrice"
                />
              </Form.Group>
              <Form.Group xs={6} as={Col} controlId="formGridText">
                <Form.Label>Max Range</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Phone"
                  value={buyRange.maxPrice}
                  onChange={onBuyRangeChange}
                  name="maxPrice"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  onChange={onInputChange}
                  value={form.investorType}
                  name="investorType"
                >
                  {userTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Button
                  className="submit"
                  style={{ width: "100%" }}
                  type="submit"
                  onClick={() => setModalShow(false)}
                >
                  Create Buyer
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default connect(null, { addNewBuyer })(CreateBuyer);
