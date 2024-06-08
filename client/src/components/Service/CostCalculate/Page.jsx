import React from "react";
import { useCart } from "react-use-cart";
import { Button, Col, Container, Row } from "react-bootstrap";

const Page = () => {
  const { addItem } = useCart();

  const products = [
    {
      id: 1,
      name: "MONDAY CRM SETUP-ONE TIME",
      price: 200,
      quantity: 1,
    },
    {
      id: 2,
      name: "PREDECTIVE DIALER UNLIMIT ",
      price: 125,
      quantity: 1,
    },
    {
      id: 3,
      name: "LIST SKIPTRACED 10K RECORD",
      price: 400,
      quantity: 1,
    },
    {
      id: 4,
      name: "REAL Estate COLD CALLERS",
      price: 792,
      quantity: 1,
    },
  ];

  return (
    <div>
      <Container>
        <Row>
          {products.map((p) => (
            <Col
              md="3"
              key={p.id}
              className="text-center mb-10 productsselected"
            >
              <h2>{p.name}</h2>
              <h3>${p.price}</h3>
              <div className="add_cart">
                <Button onClick={() => addItem(p)}>Add to costs</Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Page;
