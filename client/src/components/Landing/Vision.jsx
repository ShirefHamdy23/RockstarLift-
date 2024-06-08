import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import vision from "../../assets/value.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const Vision = () => {
  return (
    <div className="vision">
      <Container>
        <Row>
          <Col md={6}>
            <div className="vision_left" data-aos="fade-right">
              <div className="image">
                <Image src={vision} />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div className="vision_right">
              <div>
                <div className="service_list">
                  <ListGroup>
                    <ListGroup.Item>
                      <i>
                        <FontAwesomeIcon icon={faCheck} />
                      </i>
                      RockStarCallers emphasizes the importance of clear and
                      persuasive communication during cold calls.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i>
                        <FontAwesomeIcon icon={faCheck} />
                      </i>
                      RockStarCallers understands that successful cold calling
                      requires thorough prospect research.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i>
                        <FontAwesomeIcon icon={faCheck} />
                      </i>
                      RockStarCallers understands that successful cold calling
                      requires thorough prospect research.
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Vision;
