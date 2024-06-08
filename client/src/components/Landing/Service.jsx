import { Button, Col, Image, ListGroup, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import about from "../../assets/about.jpg"

const Service = () => {
  return (
    <div className="service">
      <Row>
        <Col md={6}>
          <div className="service_left">
            <div>
              <div className="service_list">
                <ListGroup>
                  <ListGroup.Item>
                    <i>
                      <FontAwesomeIcon icon={faCheck} />
                    </i>
                    Transforming Your Business with Effective Cold Calling
                    Services
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i>
                      <FontAwesomeIcon icon={faCheck} />
                    </i>
                    Generate High-Quality Leads.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i>
                      <FontAwesomeIcon icon={faCheck} />
                    </i>
                    Maximize Sales Potential.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i>
                      <FontAwesomeIcon icon={faCheck} />
                    </i>
                    Gain a Competitive Edge.
                  </ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                </ListGroup>
              </div>
              <div className="service_button">
                <Button
                  onClick={() => window.location.replace("/service")}
                  variant="secondary"
                >
                  Service
                </Button>
                <Button variant="dark">How We Work</Button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="service_right" data-aos="fade-left">
            <div className="image">
              <Image src={about} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Service
