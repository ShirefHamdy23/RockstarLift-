import {
  Button,
  Carousel,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  ToastContainer,
} from "react-bootstrap";
import MakeOffer from "./MakeOffer";
import infoImg from "../../assets/property-info-2.jpg";
import layoutImg from "../../assets/property-map-room-1.jpg";
import kitchen from "../../assets/09-768x857.jpg";
import living from "../../assets/07-768x857.jpg";
import stairs from "../../assets/10-768x857.jpg";
import reception from "../../assets/08.jpg";
import PropertyInquire from "./PropertyInquire";
import { connect } from "react-redux";
import { fetchImages, fetchProperty } from "../../redux/action/properties";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./../../Loader";
import Map from "../Map";
import { postAddress } from "./../../redux/action/addressAction";
import contactImg from "../../assets/banner-image.png";
import ImageGallery from "react-image-gallery";
import slideImage1 from "../../assets/08.jpg";
import slideImage2 from "../../assets/10-768x857.jpg";
import slideImage3 from "../../assets/07-768x857.jpg";
import slideImage4 from "../../assets/09-768x857.jpg";
import {
  faParking,
  faChartBar,
  faBed,
  faBath,
  faCircleArrowLeft,
  faClockFour,
  faLocationPin,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import { makeOffer } from "../../redux/action/OfferActions";
import { toast } from "react-toastify";
const PropertyDescription = (props) => {
  const [load, setLoad] = useState(true);
  const { loading } = props;
  const { property } = props;
  const navigate = useNavigate();
  const { images } = props;
  let { id } = useParams();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/rockstar-lift/login");
    }
  }, []);
  useEffect(() => {
    props.fetchProperty(id);
  }, [props.fetchProperty, id]);
  useEffect(() => {
    props.fetchImages(id);
  }, [props.fetchImages, id]);
  const onAddressClick = () => {
    const addressDataReq = {
      property: id,
      seller: property.user._id,
    };
    props.postAddress(addressDataReq);
  };
  if (loading || property === null) {
    return (
      <div>
        <Loader load={load} />
      </div>
    );
  }

  const slideImages = [
    { src: slideImage1, height: "75" },
    { src: slideImage2, height: "75" },
    { src: slideImage3, height: "75" },
    { src: slideImage4, height: "75" },
  ];
  // const galleryImages = images.map((image) => ({
  //   original: image.original,
  //   thumbnail: image.thumbnail,
  // }))

  return (
    <>
      <div className="container-wrapper">
        {/* <div className="property_main">
          <Container>
            <Row>
              <Col md={12}>
                <div className="head_left ">
                  <div>
                    <div className="h_title text-center">
                      <h1>Let's Take You To Your Dream House</h1>
                    </div>
                    <Button className="tour_btn text-center" href="#prop">
                      Take a tour
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div> */}

        <div className="property_layout" id="prop">
          <Container>
            <Row>
              <Col md={8}>
                <div className="above_slide">
                  <div className="link">
                    <a href="/rockstar-lift/properties">
                      <FontAwesomeIcon icon={faCircleArrowLeft} /> {""}
                      Back To List
                    </a>
                  </div>
                  <h1>
                    {property.title} in {property.city}
                  </h1>
                  <p className="address">
                    <i>
                      <FontAwesomeIcon icon={faLocationPin} />{" "}
                    </i>
                    {property.city}, {property.state}, {property.zipCode}
                  </p>
                  <p className="date">
                    <i>
                      <FontAwesomeIcon icon={faClockFour} />{" "}
                    </i>
                    Added in :
                    {moment(property.walkthroughStartDate).format("DD-MM_YYYY")}
                  </p>
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                <div className="price_details">
                  <h3 data-aos="fade-right" data-aos-delay="100">
                    Price
                  </h3>
                  <p data-aos="fade-left" data-aos-delay="200">
                    <i>
                      <FontAwesomeIcon icon={faDollarSign} />
                    </i>
                    {property?.buyNowPrice}
                  </p>
                </div>
                <div className="arv_details">
                  <h3 data-aos="fade-right" data-aos-delay="400">
                    ARV
                  </h3>
                  <p data-aos="fade-left" data-aos-delay="500">
                    <i>
                      <FontAwesomeIcon icon={faDollarSign} />
                    </i>
                    {property?.ARV}
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="m-0">
              <Col md={8}>
                {/* <img src={layoutImg} data-aos="fade-left" /> */}
                <Carousel>
                  {images.map((image, index) => (
                    <Carousel.Item key={index} interval={1000}>
                      <img
                        className="d-block w-100"
                        src={`data:${image.contentType};base64,${image.data}`}
                        alt={`Slide ${index}`}
                        style={{ height: "600px", width: "100%" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                <div className="layout">
                  <ListGroup variant="flush">
                    <div className="list_items">
                      <p data-aos="fade-right" data-aos-delay="500">
                        <i className="bx bxl-windows me-2"></i>
                        Sq. Footage
                      </p>
                      <span data-aos="fade-left" data-aos-delay="600">
                        {property?.sqft}
                      </span>
                    </div>
                    <div className="list_items">
                      <p data-aos="fade-right" data-aos-delay="500">
                        <i className="bx bx-building me-2"></i>
                        Type
                      </p>
                      <span data-aos="fade-left" data-aos-delay="600">
                        {property?.propertyType}
                      </span>
                    </div>
                    {/* <div className="list_items">
                      <p>
                        <FontAwesomeIcon className="me-2" icon={faParking} />
                        Parking
                      </p>
                      <span>Assigned</span>
                    </div> */}
                    <div className="list_items">
                      <p data-aos="fade-right" data-aos-delay="500">
                        <i className="bx bx-calendar me-2"></i>
                        Year build
                      </p>
                      <span data-aos="fade-left" data-aos-delay="600">
                        {property?.yearBuilt}
                      </span>
                    </div>
                    <div className="list_items">
                      <p data-aos="fade-right" data-aos-delay="500">
                        <FontAwesomeIcon className="me-2" icon={faChartBar} />
                        lot Size
                      </p>
                      <span data-aos="fade-left" data-aos-delay="600">
                        {property.lotSize}
                      </span>
                    </div>
                    <div className="list_items">
                      <p data-aos="fade-right" data-aos-delay="500">
                        <FontAwesomeIcon className="me-2" icon={faBed} />
                        BedRooms
                      </p>
                      <span data-aos="fade-left" data-aos-delay="600">
                        {property.bedRooms}
                      </span>
                    </div>
                    <div className="list_items">
                      <p data-aos="fade-right" data-aos-delay="500">
                        <FontAwesomeIcon className="me-2" icon={faBath} />
                        BathRooms
                      </p>
                      <span data-aos="fade-left" data-aos-delay="600">
                        {property.bathRooms}
                      </span>
                    </div>
                    {/* <div className="list_items">
                      <p>
                        <FontAwesomeIcon className="me-2" icon={faBath} />
                        Half BathRooms
                      </p>
                      <span>{property.bathRooms}</span>
                    </div> */}
                  </ListGroup>
                  <div className="buttons">
                    <MakeOffer
                      buyNowPrice={property.buyNowPrice}
                      sellerId={property.user}
                    />
                    <Button
                      className="border-0 w-100 w-100 mt-2"
                      onClick={() => {
                        props.makeOffer({
                          EMD: 0,
                          amount: property.buyNowPrice,
                          property: property._id,
                          seller: property.user._id,
                        });
                      }}
                    >
                      Win it for $448K
                    </Button>{" "}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div
          className="property_info"
          data-aos="fade-left"
          data-aos-delay="500"
        >
          <Container>
            <Row className="m-0">
              <Col md={8}>
                <h5>
                  <div className="title ">
                    <h2 className="header ml-2 fs-4">SUMMARY</h2>
                  </div>
                </h5>
                <div className="info">
                  <p>{property.description}</p>
                  <p>
                    ARV ${property.ARV} BUY NOW FOR ${property.buyNowPrice}{" "}
                  </p>
                  <p>
                    {property.title} in {property.city},{property.state},
                    {property.zipCode}, {property.county} is a{" "}
                    {property.propertyType} with{" "}
                  </p>
                  <p>
                    Status {property.status !== "Draft" || property !== "Sold"}{" "}
                    : Available
                  </p>
                  <p>
                    Walk Through Start Date :{" "}
                    {moment(property.walkthroughStartDate).format("DD-MM-YYYY")}
                  </p>
                  <p>
                    Walk Through End Date :{" "}
                    {moment(property.walkthroughStartDate).format("DD-MM-YYYY")}
                  </p>
                  <span>{property?.description}</span>
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                {/* <div className="contact"> */}
                <h5>CONTACT</h5>
                {/* <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas molestias excepturi sint
                    occaecati cupiditate non provident, similique
                  </p> */}
                {property.user.profilePic && (
                  <img
                    src={`data:${property.user?.profilePic?.contentType};base64,${property.user.profilePic.data}`}
                    alt="Main"
                    style={{ width: "250px", height: "250px" }}
                  />
                )}

                <p className="manager">
                  {property.user.firstName + " " + property.user.lastName}
                </p>
                <div className="contact_btn  mt-4">
                  <Button
                    className="border-0 w-100 w-100 mt-2"
                    onClick={onAddressClick}
                  >
                    Request the address now
                  </Button>
                  <div className="buttons">
                    <PropertyInquire />
                  </div>
                </div>
                {/* </div> */}
              </Col>
            </Row>
          </Container>
          <ToastContainer
            style={{
              zIndex: 9999123123,
            }}
          />
        </div>
      </div>
      <div className="map">
        <Container>
          <Map
            lat={property.latTitude}
            lng={property.longTitude}
            name={property.title}
            description={property.description}
          />
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  property: state.properties.property,
  loading: state.properties.loading,
  images: state.images.images,
});
export default connect(mapStateToProps, {
  fetchProperty,
  fetchImages,
  postAddress,
  makeOffer,
})(PropertyDescription);
