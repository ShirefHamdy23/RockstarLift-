import React, { useState } from "react";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import ApexCharts from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

const AdminDashboard = () => {
  const [buyersOptions, setBuyersOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar: {
        show: true,
        tools: {
          download: false,
        },
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  const [buyersSeries, setBuyersSeries] = useState([
    {
      name: "",
      data: [5, 10, 30, 15, 70, 30, 40, 45, 50, 49, 60, 90],
    },
  ]);

  const sellersOptions = {
    series: [
      {
        name: "Actual",
        data: [
          {
            x: "2011",
            y: 1292,
            goals: [
              {
                name: "Expected",
                value: 1400,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2012",
            y: 4432,
            goals: [
              {
                name: "Expected",
                value: 5400,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2013",
            y: 5423,
            goals: [
              {
                name: "Expected",
                value: 5200,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2014",
            y: 6653,
            goals: [
              {
                name: "Expected",
                value: 6500,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2015",
            y: 8133,
            goals: [
              {
                name: "Expected",
                value: 6600,
                strokeHeight: 13,
                strokeWidth: 0,
                strokeLineCap: "round",
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2016",
            y: 7132,
            goals: [
              {
                name: "Expected",
                value: 7500,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2017",
            y: 7332,
            goals: [
              {
                name: "Expected",
                value: 8700,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2018",
            y: 6553,
            goals: [
              {
                name: "Expected",
                value: 7300,
                strokeHeight: 2,
                strokeDashArray: 2,
                strokeColor: "#775DD0",
              },
            ],
          },
        ],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
      },
    },
    colors: ["#00E396"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ["Actual", "Expected"],
      markers: {
        fillColors: ["#00E396", "#775DD0"],
      },
    },
  };
  return (
    <div className="admin-dashboard">
      <Container>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody>
                <div className="buyersChart mt-2">
                  <h3>Buyers</h3>
                  <ApexCharts
                    options={buyersOptions}
                    series={buyersSeries}
                    type="bar"
                    width="550"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody>
                <div className="buyersChart mt-2">
                  <h3>Sellers</h3>
                  <ReactApexChart
                    options={sellersOptions}
                    series={sellersOptions.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
