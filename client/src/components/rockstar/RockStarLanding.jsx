import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const RockStarLanding = () => {
  return (
    <div className="landing p-0">
      <div className="main">
        <Container>
          <Row>
            <Col md={12}>
              <div className="head_left">
                <div>
                  <div className="h_title text-center mb-5">
                    <h1>
                      Revolutionizing Real Estate: Streamlined Searches,
                      Seamless Communication, and Smart Investment Insights
                    </h1>
                  </div>
                  <div className="buttons text-center">
                    {localStorage.getItem("token") ? null : (
                      <Button
                        className="register_btn text-center m-2"
                        href="/rockstar-lift/register"
                      >
                        Register Now
                      </Button>
                    )}
                    <Button
                      className="register_btn text-center m-2"
                      href="/rockstar-lift/properties"
                    >
                      Check Our Property Now
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RockStarLanding;
