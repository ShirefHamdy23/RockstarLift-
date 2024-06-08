import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Col, Row, Container } from "react-bootstrap";
import home from "../../../assets/hom2.jpg";

import PropertySearch from "./PropertySearch";
import { useState, useEffect } from "react";
import PropertyDashboardCard from "./PropertyDashboardCard";
import Loader from "./../../../Loader";
import { connect } from "react-redux";
import {
  deleteProperty,
  fetchProperties,
  fetchPropertiesBySellerId,
} from "../../../redux/action/properties";
import home1 from "../../../assets/Tests/Blue-Heron-Homes-Feature-2023-scaled.jpg";
import home2 from "../../../assets/Tests/Detached singlefamily home in a suburban neighborhood  810x540.jpg";
import home3 from "../../../assets/Tests/Elkow-Farms-Barclay-3.jpg";
import home4 from "../../../assets/Tests/images.jpg";

const Property = (props) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userId");
  const [load, setLoad] = useState(true);
  const { properties, loading } = props;

  useEffect(() => {
    props.fetchPropertiesBySellerId(id);
    setData(props.properties);
  }, [props.fetchPropertiesBySellerId]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  useEffect(() => {
    setData(properties);
    setLoad(false);
  });
  const onInputChange = (evt) => {
    const value = evt.target.value;
    setSearchText(value);
    // if (searchText !== "") {
    //   setData(
    //     data.filter(
    //       (home) =>
    //         home.title.includes(searchText) || home.address.includes(searchText)
    //     )
    //   );
    // }
    console.log(value);
    if (value !== "") {
      setData(
        properties.filter((property) =>
          property.title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setData(properties);
    }
  };
  if (loading) {
    return (
      <div>
        <Loader load={load} title={props.error} />
      </div>
    );
  }

  const role = localStorage.getItem("role");
  return (
    <Container>
      <div className=" mb-5">
        <h2 className="w-100">Properties</h2>
      </div>
      {role === "Retail" && properties.length === 1 ? null : (
        <div className="search_add">
          <PropertySearch
            handleSubmit={handleSubmit}
            onChange={onInputChange}
            value={searchText}
          />
        </div>
      )}
      <div className="main_section">
        <Row className="d-flex justify-content-center">
          {data.map((property) => (
            <PropertyDashboardCard
              key={property._id}
              _id={property._id}
              street={property.streetAddress}
              title={property.title}
              city={property.city}
              state={property.state}
              zipCode={property.zipCode}
              bedRooms={property.bedRooms}
              bathRooms={property.bathRooms}
              sqft={property.sqft}
              createdAt={property.createdAt}
              status={property.status}
              author={property.user.firstName + " " + property.user.lastName}
              mainPhoto={"http://localhost:8000/api/image/" + property._id}
            />
          ))}
        </Row>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  properties: state.properties.properties,
  loading: state.properties.loading,
  error: state.properties.error,
});
export default connect(mapStateToProps, {
  fetchPropertiesBySellerId,
})(Property);
