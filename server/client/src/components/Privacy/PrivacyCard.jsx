import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const PrivacyCard = ({ header, body }) => {
  return (
    <div className="privacy_card">
      <div className="header">
        <i>
          <FontAwesomeIcon icon={faCircleInfo} />
        </i>
        {header}
      </div>
      <div className="body">{body}</div>
    </div>
  );
};
PrivacyCard.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
export default PrivacyCard;
