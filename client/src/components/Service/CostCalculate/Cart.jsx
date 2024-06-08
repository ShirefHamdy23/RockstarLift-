import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useCart } from "react-use-cart";

const Cart = () => {
  const {
    cartTotal,
    emptyCart,
    totalItems,
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  if (isEmpty)
    return <h2 className="text-center mt-5 mb-5 ">Your cart is empty</h2>;

  return (
    <div className="service_cost">
      <Container>
        <Row>
          <Col md="12">
            <table className="table text-start">
              <thead>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Operation</th>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.quantity} x {item.name}
                    </td>
                    <td> ${item.price * item.quantity}</td>
                    <td> {item.quantity} </td>

                    <td>
                      <button
                        className=" btn btn-success"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <button
                        className=" btn btn-primary mx-3"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Total Price Is ${cartTotal}</h3>
          </Col>
          <Col>
            <div className="delete_cart">
              <button
                className="deleteAllCart btn btn-danger"
                id="btn-5"
                onClick={() => emptyCart()}
              >
                DeleteAllItems
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
