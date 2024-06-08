import { Container, Navbar, Nav, Image } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { connect } from "react-redux";
import { logout } from "../../redux/action/userAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import Loader from "../../Loader";
const Navigation = (props) => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1800);
  }, []);
  const { token } = props.auth;
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", path: "/" },
    // { name: "Property", path: "/property" },
    { name: "Services", path: "/service" },
    { name: "Privacy", path: "/privacy" },
    { name: "Contact", path: "/contact" },
    { name: "Calculate", path: "/services/cost" },
    { name: "RockStar", path: "/property" }, // RockStar Lift
  ];
  const guestItems = [
    // { name: "Login", path: "/rockstart-lift/login" },
    // { name: "Register", path: "/rockstart-lift/register" },
  ];
  const userItems = [
    { name: "Settings", path: "/setting/profile" },
    { name: "Logout", path: "#" },
  ];

  const NavItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/service" },
    { name: "Privacy", path: "/privacy" },
    { name: "Contact", path: "/contact" },
    { name: "Calculate", path: "/services/cost" },
    { name: "RockStarLift", path: "/rockstar-lift" }, // RockStar Lift
  ];

  const handleLogout = () => {
    props.logout(navigate);
  };
  return (
    <div className="layout_navbar">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" className="nav-brand">
            <Image src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {NavItems.map((item) => (
                <Nav.Link key={item.name} className="nav-item" href={item.path}>
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer
        style={{
          zIndex: 9999123123,
        }}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { logout })(Navigation);
