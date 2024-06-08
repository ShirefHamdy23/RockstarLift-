import React from "react";

import CalculateCost from "./CalculateCost";
import { Container } from "react-bootstrap";

function CostCalculatorPage() {
  return (
    <div className="calculate_services">
      <Container>
        <CalculateCost />
      </Container>
    </div>
  );
}

export default CostCalculatorPage;
