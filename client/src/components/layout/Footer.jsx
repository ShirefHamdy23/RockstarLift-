import { Col, Row, Container, Image, ListGroup } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import {
  faAngleDoubleRight,
  faEnvelope,
  faLocationPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <div className="image_footer">
              <Image src={logo} />
            </div>
            <div className="contact">
              <ListGroup>
                <ListGroup.Item>
                  <i>
                    <FontAwesomeIcon icon={faLocationPin} />
                  </i>
                  Cairo, Egypt
                </ListGroup.Item>
                <ListGroup.Item>
                  <i>
                    <FontAwesomeIcon icon={faPhone} />
                  </i>
                  (213) 262-0499 & (213) 262-0980
                </ListGroup.Item>
                <ListGroup.Item>
                  <i>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </i>
                  Sales@rockstarcallers.com
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col md={4}></Col>
          <Col md={4}>
            <div className="header">
              <h3>PRIVACY & POLICY</h3>
            </div>
            <div className="privacy">
              <ListGroup>
                <ListGroup.Item>
                  <Link to="/privacy">
                    <i>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </i>
                    Privacy Policy
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/contact">
                    <i>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </i>
                    Contact
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
      <hr />
      <div className="last d-flex justify-content-center">
        <div className="social_links">
          <i>
            <FontAwesomeIcon icon={faFacebook} />
          </i>
          <i>
            <FontAwesomeIcon icon={faInstagram} />
          </i>
          <i>
            <FontAwesomeIcon icon={faTwitter} />
          </i>
          <i>
            <FontAwesomeIcon icon={faLinkedin} />
          </i>
        </div>
      </div>

      <div className="bg-dark copyRight">
        <p> Copyright &copy; 2024 Rockstar</p>
      </div>
    </footer>
  );
};

export default Footer;
