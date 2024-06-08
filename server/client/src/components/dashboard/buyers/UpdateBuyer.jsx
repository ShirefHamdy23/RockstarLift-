import { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchBuyerById,
  updateBuyer,
} from "./../../../redux/action/buyerAction";
import { ToastContainer } from "react-toastify";

const userTypes = [
  "Buy and Hold Investor",
  "Fix and Flip Investor",
  "Wholesaler",
  "Real Estate Developer",
  "Realtor",
  "Other",
];

const UpdateBuyer = (props) => {
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
  const [initialData, setInitialData] = useState({});
  const { buyerObj } = props;
  useEffect(() => {
    props.fetchBuyerById(props.buyerObj._id);
    setInitialData({
      fullName: buyerObj.name,
      email: buyerObj.email,
      phoneNumber: buyerObj.phone,
      investorType: buyerObj.investorType,
      CreatedAt: buyerObj.createdAt,
      ...buyRange,
    });
    setForm({
      fullName: buyerObj.name,
      email: buyerObj.email,
      phoneNumber: buyerObj.phone,
      investorType: buyerObj.investorType,
      CreatedAt: buyerObj.createdAt,
    });
    setBuyRange({
      minPrice: buyerObj.min,
      maxPrice: buyerObj.max,
    });
  }, [props.buyerObj._id]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const changedData = {};
    for (const key in form) {
      if (form[key] !== initialData[key]) {
        changedData[key] = form[key];
      }
    }

    props.updateBuyer(buyerObj._id, changedData);
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
      <strong
        onClick={() => setModalShow(true)}
        style={{
          cursor: "pointer",
          color: "blue",
          fontSize: "16px",
        }}
      >
        <i className="bx bx-pencil"></i>
      </strong>

      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            UPDATE BUYER
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
                  onClick={setModalShow(false)}
                >
                  Update Buyer
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
const mapStateToProps = (state) => ({
  buyer: state.buyers.buyer,
  loading: state.buyers.loading,
});
export default connect(mapStateToProps, { fetchBuyerById, updateBuyer })(
  UpdateBuyer
);
