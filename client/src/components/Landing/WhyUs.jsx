import { Fragment } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import {
  faMagnifyingGlass,
  faCircleUser,
  faHandPointer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WhyUs = () => {
  return (
    <Fragment>
      <Container>
        <h3>Why Choose Us?</h3>
        <Row>
          <Col md={4}>
            <Card className="card">
              <CardBody>
                <span>
                  <i>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </i>
                </span>
                <h2>Search Property from Anywhere</h2>
                <CardText>
                  Our platform allows you to search for properties from
                  anywhere, at any time, using any device. Advanced filtering
                  options help you find properties matching your preferences.
                  The intuitive interface. Enjoy the convenience of exploring
                  real estate opportunities without geographical limitations.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <span>
                  <i>
                    <FontAwesomeIcon icon={faCircleUser} />
                  </i>
                </span>
                <h2>Professional & Friendly Agents</h2>
                <CardText>
                  Our team of professional and friendly agents is dedicated to
                  providing exceptional service and support. They leverage their
                  expertise and extensive network to connect buyers and sellers,
                  facilitating smooth transactions. Always available to answer
                  questions and assist with negotiations, our agents ensure a
                  positive experience. Trust our agents to guide you every step
                  of the way.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <span>
                  <i>
                    <FontAwesomeIcon icon={faHandPointer} />
                  </i>
                </span>
                <h2>Buy and Sell Awsome Property</h2>
                <CardText>
                  Our platform streamlines the process of buying and selling
                  properties. Sellers can create attractive listings with
                  comprehensive details and virtual tours. Buyers can explore
                  diverse property options, submit offers, and communicate
                  directly with sellers. Advanced analytics and marketing tools
                  help you make informed decisions and achieve your real estate
                  goals effortlessly.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default WhyUs;
