import React from "react";
import "./ProductList.css";
import { Table, Spinner } from "reactstrap";
import Button from "reactstrap/lib/Button";

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compareCart: JSON.parse(localStorage.getItem("compareCart"))
        ? JSON.parse(localStorage.getItem("compareCart"))
        : []
    };
  }

  addToCart = ean => {
    this.props.ProductList.forEach(product => {
      if (product.ean === ean) {
        this.state.compareCart.push(product);
        this.setState({ compareCart: this.state.compareCart }, () => {
          localStorage.setItem(
            "compareCart",
            JSON.stringify(this.state.compareCart)
          );
          this.props.updateProducts(this.state.compareCart);
        });
      }
    });
  };

  removeFromCart = ean => {};

  render() {
    console.log("compare cart is", this.state.compareCart);
    return (
      <div className="product-table">
        <Table
          hover
          borderless
          class="table table-dark table-striped min-table-height"
        >
          <thead>
            <tr className="table-head-row">
              <th>Product Information</th>
              <th>Average Price</th>
              <th>Lowest Price</th>
              <th>Average Rating</th>
              <th>No of Sellers</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!this.props.loading ? (
              this.props.ProductList.map((product, index) => {
                return (
                  <tr key={index} className={index === 0 ? "product-record record-1": "product-record"}>
                    <td>
                      <div className="column-1-wrapper">
                        <div className="column-1-item1">
                          <img src={product.image} className="image-medium" />
                        </div>

                        <div className="column-1-item2 inner-wrapper">
                          <div className="inner-item dark">{product.title}</div>
                          <div className="inner-item"><span className="ean">EAN : {product.ean}</span></div>
                        </div>
                      </div>
                    </td>
                    <td>{product.avgPrice.toFixed(2)}</td>
                    <td>{product.prices.sort()[0].toFixed(2)}</td>
                    <td>{product.rating}</td>
                    <td>{product.sellerCount}</td>
                    <td>
                      {this.props.remove ? (
                        <Button
                          outline
                          color="primary"
                          onClick={() => this.removeFromCart(product.ean)}
                          className="round-bordered"
                        >
                          remove
                        </Button>
                      ) : (
                        <Button
                          outline
                          color="primary"
                          onClick={() => this.addToCart(product.ean)}
                          className="round-bordered"
                        >
                          Add to cart
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <Spinner color="primary" className="loader" />
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
