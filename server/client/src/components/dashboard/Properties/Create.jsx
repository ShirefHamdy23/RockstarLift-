import { useState } from "react";
import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { addProperty } from "../../../redux/action/properties";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const arrayTypes = [
  "Single Family Home",
  "Condo",
  "Townhouse",
  "Multi Family Home",
  "Apartment",
  "Air Bnb",
  "Commercial",
  "Lot",
  "Farm",
  "Ranch",
  "Manufactured",
  "Mobile Home",
  "Other",
];
const arrayStatus = ["Active", "Sold", "Archived", "Draft"];
const Create = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    county: "",
    propertyType: "",
    sqft: "",
    yearBuilt: "",
    lotSize: "",
    bedRooms: "",
    bathRooms: "",
    longTitude: "",
    latTitude: "",
    description: "",
    walkthroughStartDate: "",
    walkthroughEndDate: "",
    title: "",
    buyNowPrice: "",
    minEMD: "",
    sellingPrice: "",
    status: "",
    ARV: "",
    COMPS: "",
  });
  const [mainPhoto, setMainPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handlePhotosChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleMainPhotoChange = (e) => {
    setMainPhoto(e.target.files[0]);
  };
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    const property = new FormData();
    for (const key in form) {
      property.append(key, form[key]);
    }
    if (mainPhoto) {
      property.append("mainPhoto", mainPhoto);
    }
    photos.forEach((photo, index) => {
      property.append("photos", photo);
    });

    props.addProperty(property, navigate);
  };

  return (
    <>
      <div className="header container">
        <h2>CREATE NEW PROPERTY</h2>
      </div>
      <div className="main_section">
        <div className="create_property">
          <Container>
            <Form onSubmit={onFormSubmit}>
              <Row className="mb-3">
                <Form.Group xs={6} as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={onInputChange}
                    required
                    name="title"
                  />
                </Form.Group>
                <Form.Group xs={3} as={Col} controlId="formGridStreetAdress">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Street Address"
                    value={form.streetAddress}
                    onChange={onInputChange}
                    required
                    name="streetAddress"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={onInputChange}
                    required
                    name="city"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    value={form.state}
                    onChange={onInputChange}
                    required
                    name="state"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCounty">
                  <Form.Label>County</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="County"
                    value={form.county}
                    onChange={onInputChange}
                    required
                    name="county"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip Code"
                    value={form.zipCode}
                    onChange={onInputChange}
                    required
                    name="zipCode"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridSqft">
                  <Form.Label>Sqft</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Sqft"
                    value={form.sqft}
                    onChange={onInputChange}
                    required
                    name="sqft"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridYearBuilt">
                  <Form.Label>Year Built</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Year Built"
                    value={form.yearBuilt}
                    onChange={onInputChange}
                    required
                    name="yearBuilt"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridBedrooms">
                  <Form.Label>Bedrooms</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Bedrooms"
                    value={form.bedRooms}
                    onChange={onInputChange}
                    required
                    name="bedRooms"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBaths">
                  <Form.Label>Baths</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Baths"
                    value={form.bathRooms}
                    onChange={onInputChange}
                    required
                    name="bathRooms"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLongTitude">
                  <Form.Label>Long Titude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Long Titude"
                    value={form.longTitude}
                    onChange={onInputChange}
                    required
                    name="longTitude"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLatTitude">
                  <Form.Label>Lat Titude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Lat Titude"
                    value={form.latTitude}
                    onChange={onInputChange}
                    required
                    name="latTitude"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridLotSize">
                  <Form.Label>Lot Size</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Lot Size acres"
                    value={form.lotSize}
                    onChange={onInputChange}
                    required
                    name="lotSize"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridMinEMD">
                  <Form.Label>Min EMD</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Min EMD"
                    value={form.minEMD}
                    onChange={onInputChange}
                    required
                    name="minEMD"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBuyNowPrice">
                  <Form.Label>Buy Now Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buy Now Price"
                    value={form.buyNowPrice}
                    onChange={onInputChange}
                    required
                    name="buyNowPrice"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSellingPrice">
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Selling Price"
                    value={form.sellingPrice}
                    onChange={onInputChange}
                    required
                    name="sellingPrice"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridWalkthroughStartDate">
                  <Form.Label>Walk Through Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.walkthroughStartDate}
                    onChange={onInputChange}
                    required
                    name="walkthroughStartDate"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridWalkthroughEndDate">
                  <Form.Label>Walk Through End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.walkthroughEndDate}
                    onChange={onInputChange}
                    required
                    name="walkthroughEndDate"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridStartingPrice">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    onChange={onInputChange}
                    required
                    value={form.status}
                    name="status"
                  >
                    <option value={"Draft"}>Choose...</option>
                    {arrayStatus.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridARV">
                  <Form.Label>ARV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ARV"
                    value={form.ARV}
                    onChange={onInputChange}
                    required
                    name="ARV"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPropType">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Select
                    onChange={onInputChange}
                    required
                    value={form.propertyType}
                    name="propertyType"
                  >
                    <option>choose..</option>
                    {arrayTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCOMPS">
                  <Form.Label>COMPS</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="COMPS"
                    value={form.COMPS}
                    onChange={onInputChange}
                    required
                    name="COMPS"
                  />
                </Form.Group>
                <Form.Group md={3} as={Col} controlId="formGridDescription">
                  <Form.Label>Main Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="mainPhoto"
                    onChange={handleMainPhotoChange}
                  />
                </Form.Group>
                <Form.Group md={3} as={Col} controlId="formGridDescription">
                  <Form.Label>Gallery Photos (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    name="photos"
                    multiple
                    onChange={handlePhotosChange}
                  />
                  <Form.Text className="text-muted">
                    Choose multiple photos
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group md={6} as={Col} controlId="formGridDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={form.description}
                    onChange={onInputChange}
                    required
                    name="description"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Button
                    className="submit"
                    style={{ width: "100%", color: "white" }}
                    type="submit"
                  >
                    Create Property
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
        <ToastContainer
          style={{
            zIndex: 9999123123,
          }}
        />
      </div>
    </>
  );
};

export default connect(null, { addProperty })(Create);
