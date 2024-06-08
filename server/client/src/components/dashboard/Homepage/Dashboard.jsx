import { Col, Row } from "react-bootstrap";

import DashboardCard from "./DashboardCard";
import {
  faDollar,
  faDoorOpen,
  faHome,
  faSackDollar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const activitiesData = [
    {
      name: "New Deals",
      icon: faHome,
      count: 0,
    },
    {
      name: "New Offers",
      icon: faSackDollar,
      count: 0,
    },
    {
      name: "Accepted Offers",
      icon: faDollar,
      count: 0,
    },
    {
      name: "New Leads",
      icon: faDoorOpen,
      count: 0,
    },
    {
      name: "Assignment Fees",
      icon: faDollar,
      count: 0,
    },
    {
      name: "Average Assignment Fees",
      icon: faDollar,
      count: 0,
    },
  ];

  const buyerData = [
    {
      name: "New Buyers",
      icon: faUsers,
      count: 0,
    },
    {
      name: "Lost Buyers",
      icon: faUsers,
      count: 0,
    },
    {
      name: "Net Buyers Change",
      icon: faUsers,
      count: 0,
    },
  ];

  const emailData = [
    {
      name: "SENT",
      count: 0,
    },
    {
      name: "DELIVERED",
      count: 0,
    },
    {
      name: "OPENS",
      count: 0,
    },
    {
      name: "CLICKS",
      count: 0,
    },
  ];
  return (
    <div>
      <>
        <div className="main_section">
          <div className="activities">
            <div className="header">
              <h3>DASHBOARD</h3>
            </div>
            <p>Activity :</p>
            <Row>
              {activitiesData.map((activity, index) => (
                <Col key={index} md={3}>
                  <DashboardCard
                    icon={activity.icon}
                    count={activity.count}
                    name={activity.name}
                  />
                </Col>
              ))}
            </Row>
          </div>
          <div className="buyerMetrics">
            <p>Buyers Metrics:</p>
            <Row>
              {buyerData.map((activity, index) => (
                <Col key={index} md={3}>
                  <DashboardCard
                    icon={activity.icon}
                    count={activity.count}
                    name={activity.name}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </>
    </div>
  );
};

export default Dashboard;
