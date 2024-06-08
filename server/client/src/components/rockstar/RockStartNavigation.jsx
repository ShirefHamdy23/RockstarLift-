import { Container, Navbar, Nav, Image } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { connect } from "react-redux";
import { logout } from "../../redux/action/userAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
const RockStartNavigation = (props) => {
  const navigate = useNavigate();
  const { token } = props.auth;
  const role = localStorage.getItem("role");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/service" },
    { name: "Privacy", path: "/privacy" },
    { name: "Contact", path: "/contact" },
    { name: "Calculate", path: "/services/cost" },
    { name: "RockStar", path: "/property" },
  ];
  const guestItems = [
    { name: "Login", path: "/rockstar-lift/login" },
    { name: "Register", path: "/rockstar-lift/register" },
  ];
  const userItems = [
    { name: "Dashboard", path: "/rockstar-lift/user/profile" },
    { name: "Logout", path: "#" },
  ];

  const NavItems = [
    { name: "RockStarCallers", path: "/" },
    { name: "Property", path: "/rockstar-lift/properties" },
  ];
  const handleLogout = () => {
    props.logout(navigate);
  };

  const navbarConditionItems = () => {
    if (token) {
      return (
        <>
          {NavItems.map((item) => (
            <Nav.Link key={item.name} className="nav-item" href={item.path}>
              {item.name}
            </Nav.Link>
          ))}
          {role === "Admin" ? (
            <Nav.Link
              className="nav-item"
              href="/rockstar-lift/admin-dashboard"
              onClick={token ? handleLogout : ""}
            >
              Admin
            </Nav.Link>
          ) : null}
          {role === "Investor" || role === "Retail" ? (
            <Nav.Link
              className="nav-item"
              href="/rockstar-lift/seller/dashboard"
              onClick={token ? handleLogout : ""}
            >
              {role}
            </Nav.Link>
          ) : null}
          {userItems.map((item) => (
            <Nav.Link
              key={item.name}
              className="nav-item"
              href={item.path}
              onClick={token ? handleLogout : ""}
            >
              {item.name}
            </Nav.Link>
          ))}
        </>
      );
    } else {
      return (
        <>
          {NavItems.map((item) => (
            <Nav.Link key={item.name} className="nav-item" href={item.path}>
              {item.name}
            </Nav.Link>
          ))}

          {guestItems.map((item) => (
            <Nav.Link key={item.name} className="nav-item" href={item.path}>
              {item.name}
            </Nav.Link>
          ))}
        </>
      );
    }
  };

  return (
    <div className="layout_navbar">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src={logo}
              style={{
                width: "15%",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">{navbarConditionItems()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer
        style={{
          zIndex: 9999123123,
        }}
      />
      {/* <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" className="nav-brand">
            <Image src={logo} style={{}} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">{navbarConditionItems()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer
        style={{
          zIndex: 9999123123,
        }}
      /> */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { logout })(RockStartNavigation);
