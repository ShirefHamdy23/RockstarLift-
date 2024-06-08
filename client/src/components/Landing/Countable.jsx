import CountUp from "react-countup"
import { Col, Container, Row } from "react-bootstrap"

const Countable = () => {
  return (
    <Row className="m-0">
      <Col md={3}>
        <div className="stat" data-aos="zoom-in">
          <CountUp start={0} end={33} delay={0} duration={8}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <p>Active Clients</p>
        </div>
      </Col>
      <Col md={3}>
        <div className="stat" data-aos="zoom-in">
          <CountUp start={0} end={71} delay={0} duration={8}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <p>ACTIVE CAMPAIGN</p>
        </div>
      </Col>
      <Col md={3}>
        <div className="stat" data-aos="zoom-in">
          <CountUp start={0} end={500} delay={0} duration={12}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <p>DAILY LEADS</p>
        </div>
      </Col>
      <Col md={3}>
        <div className="stat" data-aos="zoom-in">
          <CountUp start={0} end={98} delay={0} duration={8}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <p>SATISFIED CLIENTS</p>
        </div>
      </Col>
    </Row>
  )
}

export default Countable
