import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PropertySearch = ({ handleSubmit, onChange, value }) => {
  return (
    <>
      <Row className="m-0">
        <Col md={9} className="search_form">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Control
                  placeholder="Deal Title Or address"
                  onChange={onChange}
                  value={value}
                />
              </Col>
              {/* <Col md={3}>
                <Form.Select aria-label="Default select example">
                  <option>Select Status</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select aria-label="Default select example">
                  <option>Dispositions Manager</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col> */}
              <Col md={2}>
                <Button type="submit">
                  <FontAwesomeIcon icon={faSearch} /> Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={3} className="add_button">
          <Link to="./create">
            <Button> + Create Property </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};
PropertySearch.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default PropertySearch;
