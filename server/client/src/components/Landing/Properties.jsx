import { Image, Col, Row, Container } from "react-bootstrap"
import test from "../../assets/service.jpeg"
import PropCard from "./../Property/PropCard"
const Properties = () => {
  return (
    <div style={{ position: "relative" }}>
      {/* <div className="back_svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 270">
          <path
            opacity={0.5}
            fill="#96e5e2"
            d="M0,64L48,90.7C96,117,192,171,288,181.3C384,192,480,160,576,154.7C672,149,768,171,864,197.3C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div> */}

      <Container>
        <div class="title mt-5">
          <h2 className="header">Properties</h2>
        </div>
        <Row>
          <PropCard />
          <PropCard />
          <PropCard /> <PropCard />
          <PropCard />
          <PropCard />
        </Row>
      </Container>
    </div>
  )
}

export default Properties
