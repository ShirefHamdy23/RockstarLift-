import { Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="admin_layout">
      <Row>
        <Col md={2} className="col">
          <div className="sidebar_layout">
            <Sidebar />
          </div>
        </Col>
        <Col md={10} className="col" style={{ padding: 0 }}>
          <Navigation />
          <div className="content_layout">
            <Content />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Layout;
