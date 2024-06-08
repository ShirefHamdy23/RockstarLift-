import { faIdeal } from "@fortawesome/free-brands-svg-icons";
import { faShop, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar className="dashboard_navbar" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/rockstar-lift/properties" className="nav-item">
              <i>
                <FontAwesomeIcon icon={faShop} />
              </i>
              Market Place
            </Nav.Link>
            <Nav.Link href="/rockstar-lift/user/profile" className="nav-item">
              <i>
                <FontAwesomeIcon icon={faUser} />
              </i>
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
