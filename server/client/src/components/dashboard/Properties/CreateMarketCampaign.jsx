import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import MultiUserSelect from "./MultiUserSelect";
import { getAllBuyers } from "../../../redux/action/buyerAction";
import { connect } from "react-redux";
import { createCampaign } from "../../../redux/action/campaignAction";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const buyerTypes = [
  "Buy and Hold Investor",
  "Fix and Flip Investor",
  "Wholesaler",
  "Real Estate Developer",
  "Realtor",
];
const CreateMarketCampaign = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [method, setMethod] = useState("email");
  const { id } = useParams();
  const [form, setForm] = useState({
    property: id,
    subject: "",
    text: "",
    recipients: [],
    html: "",
    CampaignName: "",
    campaignDetails: "",
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.createCampaign(form, method);
  };
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };
  const [userType, setUserType] = useState("Realtor");
  useEffect(() => {
    props.getAllBuyers();
  }, []);
  const { buyers, loading } = props;

  const handleUserTypeChange = async (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
    if (selectedType) {
      const selectedBuyers = buyers.filter(
        (buyer) => buyer.investorType === selectedType
      );
      setUsers(selectedBuyers);
      setForm({
        ...form,
        html: `
        <div>
        <h1>${form.subject}</h1>
        <p>${form.text}</p>
        </div>
        `,
        recipients:
          method === "email"
            ? selectedBuyers.map((buyer) => buyer.email)
            : ["01023619165"],
      });
    }
  };
  useEffect(() => {
    if (userType) {
      const selectedBuyers = buyers.filter(
        (buyer) => buyer.investorType === userType
      );
      setUsers(selectedBuyers);
      setForm({
        ...form,
        html: `
        <div>
        <h1>${form.subject}</h1>
        <p>${form.text}</p>
        </div>
        `,
        recipients:
          method === "email"
            ? selectedBuyers.map((buyer) => buyer.email)
            : ["01023619165"],
      });
    }
  }, [method]);
  const onCheckBoxSelect = (e) => {
    setMethod(e.target.value);
  };
  return (
    <div className="buyer_form">
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        style={{
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          margin: "10px 0",
          width: "300px",
        }}
      >
        + Create Market Campaign
      </Button>

      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            CREATE NEW CAMPAIGN
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group
              className="mt-4 d-flex justify-content-around"
              xs={12}
              as={Col}
            >
              <Form.Check
                type="radio"
                label="Send vie mail"
                name="method"
                id="email"
                value="email"
                checked={method === "email"}
                onChange={onCheckBoxSelect}
              />
              <Form.Check
                type="radio"
                label="Send vie sms"
                name="method"
                id="sms"
                value="sms"
                checked={method === "sms"}
                onChange={onCheckBoxSelect}
              />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group xs={12} as={Col} controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={onInputChange}
                    name="subject"
                  />
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="text">
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="text Amount"
                    value={form.text}
                    onChange={onInputChange}
                    name="text"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="userType">
                  <Form.Label>Buyers Type</Form.Label>
                  <Form.Select
                    id="userType"
                    value={form.userType}
                    onChange={handleUserTypeChange}
                  >
                    {buyerTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="CampaignName">
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Campaign Name"
                    value={form.CampaignName}
                    onChange={onInputChange}
                    name="CampaignName"
                  />
                </Form.Group>
                <Form.Group xs={12} as={Col} controlId="campaignDetails">
                  <Form.Label>Campaign Details</Form.Label>
                  <Form.Control
                    type="campaignDetails"
                    placeholder="Campaign Details"
                    value={form.campaignDetails}
                    onChange={onInputChange}
                    name="campaignDetails"
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
                >
                  Create Campaign
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  buyers: state.buyers.buyers,
  loading: state.buyers.loading,
});

export default connect(mapStateToProps, {
  getAllBuyers,
  createCampaign,
})(CreateMarketCampaign);
