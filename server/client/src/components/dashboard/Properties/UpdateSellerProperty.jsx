import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  fetchImages,
  fetchProperty,
  updateProperty,
} from "../../../redux/action/properties";
import Loader from "../../../Loader";

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

const UpdateSellerProperty = (props) => {
  const { id } = useParams();
  const [load, setLoad] = useState(true);
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
  const [initialData, setInitialData] = useState({});
  const [mainPhoto, setMainPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [existingMainPhoto, setExistingMainPhoto] = useState(null);
  const { property } = props;
  useEffect(() => {
    props.fetchProperty(id);
  }, []);
  useEffect(() => {
    setInitialData(property);
    setForm(property);
    setExistingPhotos(property?.photos || []);
    setExistingMainPhoto(property?.mainPhoto || null);
  }, [property]);
  const handleMainPhotoChange = (e) => {
    setMainPhoto(e.target.files[0]);
  };

  const handlePhotosChange = (e) => {
    setPhotos([...e.target.files]);
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

    const changedData = {};
    for (const key in form) {
      if (form[key] !== initialData[key]) {
        changedData[key] = form[key];
      }
    }

    const data = new FormData();
    for (const key in changedData) {
      data.append(key, changedData[key]);
    }
    if (mainPhoto) {
      data.append("mainPhoto", mainPhoto);
    }
    photos.forEach((photo, index) => {
      data.append("photos", photo);
    });
    props.updateProperty(id, data);
  };

  if (props.loading || !form) {
    return <Loader load={load} />;
  }
  return (
    <>
      <div className="main_section">
        <div className="header container">
          <h3>Update Property</h3>
        </div>
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
                    name="walkthroughStartDate"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridWalkthroughEndDate">
                  <Form.Label>Walk Through End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.walkthroughEndDate}
                    onChange={onInputChange}
                    name="walkthroughEndDate"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridStartingPrice">
                  <Form.Label>Starting Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Starting Price"
                    value={form.startingPrice}
                    onChange={onInputChange}
                    name="startingPrice"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBuyNowPrice">
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
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPropType">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Select
                    onChange={onInputChange}
                    value={form.propertyType}
                    name="propertyType"
                  >
                    <option value={"Single Family Home"}>
                      Single Family Home
                    </option>
                    {arrayTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
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
                    onChange={handlePhotosChange}
                    multiple
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
                    name="description"
                  />
                </Form.Group>
                <Col md={3}>
                  {existingMainPhoto && (
                    <img
                      src={`data:image/png;base64,${existingMainPhoto}`}
                      alt="Main"
                      style={{ width: "100%" }}
                    />
                  )}
                </Col>
                <Col md={3}>
                  {existingPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={`data:image/png;base64,${photo}`}
                      alt={`Photo ${index + 1}`}
                      style={{ width: "50%", height: "100px" }}
                    />
                  ))}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Button
                    className="submit"
                    style={{ width: "100%", color: "white" }}
                    type="submit"
                  >
                    Update Property
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
const mapStateToProps = (state) => ({
  property: state.properties.property,
  loading: state.properties.loading,
  error: state.properties.error,
  images: state.images.images,
});
export default connect(mapStateToProps, {
  fetchProperty,
  fetchImages,
  updateProperty,
})(UpdateSellerProperty);
