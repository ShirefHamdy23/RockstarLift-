import { Button, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ServiceCard = ({ image, title, description }) => {
  return (
    <div className="service_card">
      <div className="header">
        <div className="image">
          <Image src={image} />
        </div>
      </div>
      <div className="body">
        <h4
          style={{
            color: "#264653",
            fontSize: "17px",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {title}
        </h4>
        {/* </div> */}
        <div className="description">{description}</div>
        <div className="btn_serv">
          <Link to="/services/cost">
            <Button>See Costs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default ServiceCard;
