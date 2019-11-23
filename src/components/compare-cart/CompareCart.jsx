import React from "react";
import "./CompareCart.css";
import ProductList from "../product-list/ProductList";

export default class CompareCart extends React.Component {
  render() {
    let compareCart = JSON.parse(localStorage.getItem("compareCart")) || [];
    return (
      <div className="compare-cart-container">
        <h2 className="heading">Compare Cart</h2>
        <ProductList ProductList={compareCart} remove />
      </div>
    );
  }
}
