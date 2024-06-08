import React from "react";
import { Link } from "react-router-dom";

const StatsCardProperty = (props) => {
  return (
    <Link to={props.to || "/"}>
      <div className="stats_card_property">
        <div className="stats_card_property__title">{props.title}</div>
        <div className="stats_card_property__value">
          {props.value ? props.value : 0}
        </div>
      </div>
    </Link>
  );
};

export default StatsCardProperty;
