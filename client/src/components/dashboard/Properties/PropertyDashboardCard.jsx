import { Image, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import home from "../../../assets/hom2.jpg";
import {
  faBath,
  faBed,
  faClock,
  faCoins,
  faCommentSms,
  faEdit,
  faEnvelope,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { deleteProperty } from "../../../redux/action/properties";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

const PropertyDashboardCard = (props) => {
  const role = localStorage.getItem("role");
  return (
    <Col lg={3} md={6} sm={12} data-aos="fade-up">
      <div className="prop_dashboard_card">
        <div className="image">
          <Image
            style={{
              width: "100%",
              height: "200px",
            }}
            src={props.mainPhoto}
          />
        </div>
        <div className="details">
          <div
            className="title"
            style={{
              textTransform: "capitalize",
            }}
          >
            {props.title}
          </div>
          <div
            className="location fst-italic"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {props.street}
          </div>
          <div className="about d-flex justify-content-between align-content-center">
            <div className="beds">
              <span>{props.bedRooms}</span>
              <i>
                <FontAwesomeIcon icon={faBed} />
              </i>
            </div>
            <div className="baths">
              <span>{props.bathRooms}</span>
              <i>
                <FontAwesomeIcon icon={faBath} />
              </i>
            </div>
            <div className="sqft">
              <span>{props.sqft} sqft</span>
            </div>

            <div className="createdAt">
              <i>
                <FontAwesomeIcon icon={faClock} />
              </i>
              <span>{moment(props.createdAt).format("YYYY-MM-DD")}</span>
            </div>
          </div>
          <div className="author fst-italic">
            <span>{props.author}</span>
          </div>
          <div className="author fst-italic">
            Status : <span>{props.status}</span>
          </div>
          {/* <div className="messages d-flex justify-content-between align-content-center">
            <div className="email">
              <i>
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
              <span>58 (0) / 58</span>
            </div>
            <div className="sms">
              <i>
                <FontAwesomeIcon icon={faCommentSms} />
              </i>
              <span>58 (0) / 58</span>
            </div>
            <div className="total_spen">
              <i>
                <FontAwesomeIcon icon={faCoins} />
              </i>
              <span>Total Spend $1,200</span>
            </div>
          </div> */}
          <div className="buttons d-flex justify-content-between align-content-center">
            <div className="actions">
              <Link
                to={`/rockstar-lift/${
                  role === "Admin" ? "admin-dashboard" : "seller"
                }/property/edit/${props._id}`}
              >
                <Button variant="success">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => props.deleteProperty(props._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
            <div className="more">
              <Link to={`./${props._id}`}>
                <Button>More Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Col>
  );
};
export default connect(null, {
  deleteProperty,
})(PropertyDashboardCard);
