import React from "react";
import { CartProvider } from "react-use-cart";
import Cart from "./Cart";
import Page from "./Page";

const CalculateCost = () => {
  return (
    <CartProvider>
      <div className="pageCalc">
        <Page />
      </div>
      <Cart className="cartCalc" />
    </CartProvider>
  );
};

export default CalculateCost;
