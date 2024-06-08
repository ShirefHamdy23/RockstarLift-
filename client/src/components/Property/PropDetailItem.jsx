import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PropDetailItem = ({ icon, item, value }) => {
  return (
    <div>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            <i>
              <FontAwesomeIcon icon={icon} />
            </i>
            {item}
          </div>
        </div>
        <div bg="primary">{value}</div>
      </ListGroup.Item>
    </div>
  );
};
PropDetailItem.propTypes = {
  icon: PropTypes.object.isRequired,
  item: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
export default PropDetailItem;
