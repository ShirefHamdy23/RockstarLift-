import { Col, Row, Image } from "react-bootstrap";
import test from "../../assets/hom2.jpg";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PropCard = ({
  streetAddress,
  city,
  state,
  zipCode,
  area,
  bedRooms,
  bathRooms,
  sellingPrice,
  mainPhoto,
  property_id,
}) => {
  let navigate = useNavigate();
  const onCardClick = (id) => {
    navigate(`./${id}`);
  };
  return (
    <Col
      md={6}
      lg={4}
      sm={12}
      className="property"
      onClick={() => onCardClick(property_id)}
      data-aos="flip-up"
      data-aos-duration="1000"
      data-aos-easing="linear"
    >
      <div className="prop-card">
        <div className="image-property">
          <Image src={mainPhoto} />
        </div>
        <div className="detail-property">
          <Row>
            <Col md={6}>
              <div className="address">
                {city}, {state}, {zipCode}
              </div>
              <div className="description">
                <Row>
                  <Col>
                    <div className="area">Area</div>
                    <div className="area">{area}</div>
                  </Col>
                  <Col>
                    <div className="area">Beds</div>
                    <div className="area">{bedRooms}</div>
                  </Col>
                  <Col>
                    <div className="area">Baths</div>
                    <div className="area">{bathRooms}</div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={6}>
              <div className="price">${sellingPrice}</div>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};
PropCard.propTypes = {
  streetAddress: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  area: PropTypes.string,
  bedRooms: PropTypes.string,
  bathRooms: PropTypes.string,
  sellingPrice: PropTypes.string,
};
export default PropCard;
