import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PropCard from "./PropCard";
import { connect } from "react-redux";
import {
  fetchFilteredProperties,
  fetchProperties,
} from "../../redux/action/properties";
import { useEffect, useState } from "react";
import Loader from "../../Loader";

const filterKeyArray = ["city", "county", "state", "zipCode"];
const PropertyPage = (props) => {
  const [load, setLoad] = useState(true);
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const handleFilterKeyChange = (e) => {
    setFilterKey(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    props.fetchFilteredProperties(filterKey, filterValue);
  };
  const { properties, filteredProperties } = props;

  useEffect(() => {
    const { fetchProperties } = props;
    fetchProperties();
  }, [props.fetchProperties]);
  useEffect(() => {}, [props.loading]);
  if (props.loading) {
    return (
      <div>
        <Loader load={load} title={props.error} />
      </div>
    );
  }
  // Dummy Data
  // const rows = [
  //   {
  //     mainPhoto: home1,
  //     bathRooms: "2",
  //     bedRooms: "3",
  //     buyNowPrice: "200000",
  //     city: "Los Angeles",
  //     county: "Hussein",
  //     createdAt: "2024-06-04T05:11:36.776Z",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  //     latTitude: "45.678",
  //     longTitude: "123.456",
  //     lotSize: "0.5 acres",
  //     minEMD: "10000",
  //     propertyType: "Single Family Home",
  //     sellingPrice: "220000",
  //     sqft: "2000",
  //     state: "CA",
  //     status: "Draft",
  //     streetAddress: "123 Maple St",
  //     title: "Property Advertisement",
  //     updatedAt: "2024-06-04T05:11:36.776Z",
  //     walkthroughEndDate: "2024-06-13T00:00:00.000Z",
  //     walkthroughStartDate: "2024-06-20T00:00:00.000Z",
  //     yearBuilt: "2005",
  //     zipCode: "12345",
  //   },
  //   {
  //     mainPhoto: home2,

  //     bathRooms: "4",
  //     bedRooms: "5",
  //     buyNowPrice: "350000",
  //     city: "San Fran",
  //     county: "Salah",
  //     createdAt: "2024-06-05T10:00:00.000Z",
  //     description: "Another property description.",
  //     latTitude: "37.7749",
  //     longTitude: "122.4194",
  //     lotSize: "1 acre",
  //     minEMD: "20000",
  //     propertyType: "Townhouse",
  //     sellingPrice: "380000",
  //     sqft: "2500",
  //     state: "CA",
  //     status: "Published",
  //     streetAddress: "2 Elm St",
  //     title: "Townhouse for Sale",
  //     updatedAt: "2024-06-05T10:00:00.000Z",
  //     walkthroughEndDate: "2024-06-15T00:00:00.000Z",
  //     walkthroughStartDate: "2024-06-22T00:00:00.000Z",
  //     yearBuilt: "2012",
  //     zipCode: "54321",
  //   },
  //   {
  //     mainPhoto: home3,

  //     bathRooms: "3",
  //     bedRooms: "4",
  //     buyNowPrice: "280000",
  //     city: "Chicago",
  //     county: "Ali",
  //     createdAt: "2024-06-06T11:45:00.000Z",
  //     description: "Beautiful family home with spacious backyard.",
  //     latTitude: "41.8781",
  //     longTitude: "87.6298",
  //     lotSize: "0.7 acres",
  //     minEMD: "15000",
  //     propertyType: "Single Family Home",
  //     sellingPrice: "300000",
  //     sqft: "2200",
  //     state: "IL",
  //     status: "Draft",
  //     streetAddress: "789 Pine St",
  //     title: "Family Home",
  //     updatedAt: "2024-06-06T11:45:00.000Z",
  //     walkthroughEndDate: "2024-06-18T00:00:00.000Z",
  //     walkthroughStartDate: "2024-06-25T00:00:00.000Z",
  //     yearBuilt: "2008",
  //     zipCode: "60601",
  //   },
  //   {
  //     mainPhoto: home4,

  //     bathRooms: "1",
  //     bedRooms: "2",
  //     buyNowPrice: "150000",
  //     city: "Miami",
  //     county: "Ahmed",
  //     createdAt: "2024-06-07T09:20:00.000Z",
  //     description: "Cozy condo with ocean view.",
  //     latTitude: "25.7617",
  //     longTitude: "80.1918",
  //     lotSize: "0.3 acres",
  //     minEMD: "8000",
  //     propertyType: "Condo",
  //     sellingPrice: "170000",
  //     sqft: "1200",
  //     state: "FL",
  //     status: "Published",
  //     streetAddress: "101 Ocean Dr",
  //     title: "Ocean View Condo",
  //     updatedAt: "2024-06-07T09:20:00.000Z",
  //     walkthroughEndDate: "2024-06-20T00:00:00.000Z",
  //     walkthroughStartDate: "2024-06-25T00:00:00.000Z",
  //     yearBuilt: "2015",
  //     zipCode: "33101",
  //   },
  // ];
  return (
    <div className="properties">
      <Container>
        <div className="prop_filter_form">
          <Form onSubmit={handleFilterSubmit}>
            <Row>
              <Form.Group
                as={Col}
                md={3}
                className="mb-3"
                controlId="filterKey"
              >
                <Form.Select
                  defaultValue={""}
                  value={filterKey}
                  onChange={handleFilterKeyChange}
                >
                  <option value={""}>Choose Filter Key</option>
                  {filterKeyArray.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">Choose Filter Key</Form.Text>
              </Form.Group>

              <Form.Group
                as={Col}
                md={3}
                className="mb-3"
                controlId="filterValue"
              >
                <Form.Control
                  type="text"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  placeholder="Filter Value"
                />
                <Form.Text className="text-muted">Choose Filter Key</Form.Text>
              </Form.Group>

              <Col md={3}>
                <div className="filter_btn">
                  <Button className="w-100" type="submit">
                    Filter
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="title ">
          <h2 className="header ml-2">Properties</h2>
        </div>
        {properties.length === 0 ? (
          <h2 className="text-center">No Properties Found</h2>
        ) : (
          <Row>
            {(filteredProperties.length ? filteredProperties : properties).map(
              (property) => (
                <PropCard
                  key={property._id}
                  property_id={property._id}
                  streetAddress={property.streetAddress}
                  city={property.city}
                  state={property.state}
                  zipCode={property.zipCode}
                  area={property.sqft}
                  bedRooms={property.bedRooms}
                  bathRooms={property.bathRooms}
                  sellingPrice={property.sellingPrice}
                  mainPhoto={`http://localhost:8000/api/image/${property._id}`}
                />
              )
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  properties: state.properties.properties,
  loading: state.properties.loading,
  error: state.properties.error,
  filteredProperties: state.properties.filteredProperties,
});

export default connect(mapStateToProps, {
  fetchProperties,
  fetchFilteredProperties,
})(PropertyPage);
