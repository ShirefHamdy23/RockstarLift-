import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
const DashboardCard = ({ icon, count, name }) => {
  return (
    <div className={`dashboardCard text-end`}>
      <div className="photo">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="title">
        <h2>{count}</h2>
        <h5>{name}</h5>
      </div>
    </div>
  );
};
DashboardCard.propTypes = {
  icon: PropTypes.object,
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
export default DashboardCard;
