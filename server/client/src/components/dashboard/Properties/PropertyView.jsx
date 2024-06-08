import React, { useEffect, useState } from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";
import { connect } from "react-redux";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { fetchImages, fetchProperty } from "../../../redux/action/properties";
import { Link, useParams } from "react-router-dom";
import Loader from "./../../../Loader";
import home1 from "../../../assets/Tests/Blue-Heron-Homes-Feature-2023-scaled.jpg";
import home2 from "../../../assets/Tests/Detached singlefamily home in a suburban neighborhood  810x540.jpg";
import home3 from "../../../assets/Tests/Elkow-Farms-Barclay-3.jpg";
import home4 from "../../../assets/Tests/images.jpg";
import moment from "moment/moment";
import StatsCardProperty from "./Stats/StatsCardProperty";
import { fetchOffersByPropertyId } from "../../../redux/action/OfferActions";
const PropertyView = (props) => {
  const [load, setLoad] = useState(true);
  let { id } = useParams();
  const { property, loading, images, offers } = props;
  // dummy data
  // const property = {
  //   bathRooms: "3",
  //   bedRooms: "4",
  //   buyNowPrice: "280000",
  //   city: "Chicago",
  //   county: "Ali",
  //   createdAt: "2024-06-06T11:45:00.000Z",
  //   description: "Beautiful family home with spacious backyard.",
  //   latTitude: "41.8781",
  //   longTitude: "87.6298",
  //   lotSize: "0.7 acres",
  //   minEMD: "15000",
  //   propertyType: "Single Family Home",
  //   sellingPrice: "300000",
  //   sqft: "2200",
  //   state: "IL",
  //   status: "Draft",
  //   streetAddress: "789 Pine St",
  //   title: "Family Home",
  //   updatedAt: "2024-06-06T11:45:00.000Z",
  //   walkthroughEndDate: "2024-06-18T00:00:00.000Z",
  //   walkthroughStartDate: "2024-06-25T00:00:00.000Z",
  //   yearBuilt: "2008",
  //   zipCode: "60601",
  // };
  useEffect(() => {
    props.fetchProperty(id);
    props.fetchOffersByPropertyId(id);
  }, [props.fetchProperty, id]);
  useEffect(() => {
    props.fetchImages(id);
  }, [props.fetchImages, id]);
  if (loading || property === null) {
    return (
      <div>
        <Loader load={load} />
      </div>
    );
  }
  if (images.length === 0) {
    return <Loader load={load} />;
  }
  const role = localStorage.getItem("role");
  return (
    <div className="dashboard_property_view m-2 ">
      <div className="mt-5 mb-5 d-flex justify-content-center">
        {/* <Row style={{ width: "100%" }}>
          <Col md={4} className="d-flex justify-content-center">
            <StatsCardProperty
              title={"Offers"}
              value={offers.length === 0 ? "0" : offers.length}
              to={`/rockstart-lift/seller/properties/${id}/offers`}
            />
          </Col>
          <Col md={4} className="d-flex justify-content-center">
            <StatsCardProperty title={"Messages"} value={6} />
          </Col>
          <Col md={4} className="d-flex justify-content-center">
            <StatsCardProperty title={"Status"} value={"6"} />
          </Col>
        </Row> */}
      </div>
      <Container>
        <div className="m-5 text-end">
          <Button
            style={{
              width: "200px",
              color: "#2a9d8f",
              background: "#2a9d8f",
              border: "none",
            }}
          >
            <Link
              to={`/rockstar-lift/${
                role === "Admin" ? "admin-dashboard" : "seller"
              }/properties/${id}/campaign`}
              style={{
                color: "white",
              }}
            >
              Campaigns
            </Link>
          </Button>
        </div>
      </Container>
      <Row>
        <Col lg={12} className="d-flex justify-content-center">
          <MDBCarousel
            style={{ width: "80%" }}
            showIndicators
            showControls
            fade
          >
            <MDBCarouselItem itemId={1}>
              <img
                style={{ height: "500px", width: "100%" }}
                src={home1}
                data-aos="fade-right"
              />
            </MDBCarouselItem>
            {images.map((image, index) => (
              <MDBCarouselItem key={index} itemId={2 + index}>
                <img
                  style={{ height: "500px", width: "100%" }}
                  src={`data:${image.contentType};base64,${image.data}`}
                />
              </MDBCarouselItem>
            ))}
          </MDBCarousel>
        </Col>
        <div className="adv text-center">
          <h2 className="mt-4">{property.title}</h2>
          <p>{property.description}</p>
        </div>
        <Col lg={6}>
          <Card className="card">
            <div className="property_info text-start mt-0">
              <h2 className="ml-2">Property Information</h2>
              <ListGroup variant="flush" className="prop-list">
                <ListGroup.Item>
                  TOTAL PURCHASE PRICE : <span>${property.sellingPrice}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Type : <span>{property.propertyType} </span>
                </ListGroup.Item>

                <ListGroup.Item>
                  Title: <span>{property.title}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Min EMD: <span>${property.minEMD}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  Buy Now Price: <span>${property.buyNowPrice}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Status : <span>{property.status}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  Address :
                  <span>
                    {property.streetAddress}, {property.city},{property.state},
                    {property.zipCode}
                  </span>
                </ListGroup.Item>

                <ListGroup.Item>
                  Walk Through Start Date :
                  <span>
                    {moment(property.walkthroughStartDate).format("DD-MM-YYYY")}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Walk Through End Date :
                  <span>
                    {moment(property.walkthroughEndDate).format("DD-MM-YYYY")}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="card">
            <div className="property_layout mt-0" id="prop">
              <Container>
                <Row className="m-0">
                  <div className="layout">
                    <h2>Property Layout</h2>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Floor : <span>First Floor </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Total Area : <span>{property?.sqft} Square Feets </span>
                      </ListGroup.Item>
                      {/* <ListGroup.Item>Room : 5</ListGroup.Item> */}
                      <ListGroup.Item>
                        Bed : <span>{property.bedRooms}</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Bathroom : <span>{property.bedRooms}</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        lot Size : <span>{property.lotSize}</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        longitude: <span>{property.longTitude}</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        latitude : <span>{property.latTitude}</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Status : <span>{property.status}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Row>
              </Container>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => ({
  property: state.properties.property,
  loading: state.properties.loading,
  error: state.properties.error,
  images: state.images.images,
  offers: state.offers.offers,
});

export default connect(mapStateToProps, {
  fetchProperty,
  fetchImages,
  fetchOffersByPropertyId,
})(PropertyView);
