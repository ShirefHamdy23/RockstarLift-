import { Col, Container, Row, Image, Button } from "react-bootstrap";
import home from "../../assets/banner-image.png";

import Countable from "./Countable";
import Service from "./Service";
import Vision from "./Vision";
import Properties from "./Properties";
import WhyUs from "./WhyUs";
import { useState, useEffect } from "react";
import Loader from "../../Loader";

const Landing = () => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1800);
  }, []);
  return (
    <>
      {load ? (
        <Loader load={load} />
      ) : (
        <div className="landing">
          <div className="main">
            {/* <Navigation /> */}

            <Container>
              <Row>
                <Col md={12}>
                  <div className="head_left">
                    <div>
                      <div className="h_title">
                        <h1>
                          Welcome to Rockstar Callers™ , by The premier cold
                          calling agency that takes your business to the next
                          level
                        </h1>
                      </div>
                      {/* <Button
                        className="register_btn text-center"
                        href="/rockstart-lift/properties"
                      >
                        Register Now
                      </Button> */}
                    </div>
                  </div>
                </Col>
                {/* <Col md={6}>
            <div className="head_right" data-aos="zoom-in">
              <div className="imageContainer d-flex justify-content-end align-items-center">
                <Image
                  src={home}
                  alt="header-image"
                  className="head_rightImg"
                />
              </div>
            </div>
          </Col> */}
              </Row>
            </Container>
          </div>

          {/* <div className="landing_props">
            <Properties />
          </div> */}

          <Container className="landing_service">
            <Service />
          </Container>
          <div className="stats">
            <Countable />
          </div>
          <div className="landing_vision">
            <Vision />
          </div>
          <div className="whyUs">
            <WhyUs />
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
