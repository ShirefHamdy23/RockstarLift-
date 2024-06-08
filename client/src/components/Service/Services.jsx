import { Col, Container, Row } from "react-bootstrap";
import servcies1 from "../../assets/services/customer1.png";
import servcies2 from "../../assets/services/customer2.png";
import servcies3 from "../../assets/services/customer3.png";
import servcies4 from "../../assets/services/customer4.png";
import ServiceCard from "./ServiceCard";
const Services = () => {
  const servicesCards = [
    {
      image: servcies1,
      title: "COLD CALLING",
      description:
        "OUR COLD CALLING SERVICE IS DESIGNED TO HELP YOU REACH NEW PROSPECTS",
      aos: "fade-right",
    },
    {
      image: servcies2,
      title: "APPOINTMENT SETTING",
      description:
        "APPOINTMENT SETTING IS A CRUCIAL STEP IN THE SALES PROCESSAND",
      aos: "fade-up",
    },
    {
      image: servcies3,
      title: "CUSTOMER SERVICE",
      description:
        "EXCEPTIONAL CUSTOMER SERVICE IS AT THE HEART OF EVERY SUCCESSFUL BUSINESS",
      aos: "fade-down",
    },
    {
      image: servcies4,
      title: "B2B SALES",
      description:
        "OUR B2B SALES SOLUTIONS ARE SPECIFICALLY DESIGNED TO HELP YOU SUCCEED IN THE BUSINESS",
      aos: "fade-left",
    },
  ];
  return (
    <div className="services">
      <div className="main">
        Our service consistently exceeds customer expectations.
      </div>
      <div className="services_cards">
        <Container>
          <div class="title text-center mb-5">
            <h2 className="header">Services</h2>
          </div>
          <Row>
            {servicesCards.map((card) => (
              <Col
                key={card.title}
                md={3}
                data-aos={card.aos}
                data-aos-duration="2000"
              >
                <ServiceCard
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Services;
