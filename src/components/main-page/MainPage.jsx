import React, { Suspense } from "react";
// import "./App.css";
import "./MainPage.css";
import axios from "axios";
import { Button, Input } from "reactstrap";
import Navbar from "../navbar/Navbar";
import API_ROUTES from "../../constants/ApiRoute";
// import ProductList from "../product-list/ProductList";
const ProductList = React.lazy(() => import("../product-list/ProductList"));

class MainPage extends React.Component {
  state = {
    products: [],
    text: null,
    loading: false
  };
  arrSum = arr => arr.reduce((a, b) => a + b, 0);
  search = async text => {
      if(this.state.text && this.state.text.trim().length>0) {
          
    this.setState({ loading: true });
    const params = {
      apikey: API_ROUTES.API_KEY,
      q: text,
      format: "json",
      includeattributes: true,
      offers: "all"
    };
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json"
    };
    try {
      const response = await axios.get(
        API_ROUTES.SEARCH,
        { params },
        { headers, credentials: true, crossDomain: true }
      );
      console.log(response);
      let productMap = [];
      if (response.data.products) {
        response.data.products.forEach(product => {
          let sellerCount = 0;
          product.offerData.offers.forEach(e => {
            if (e.seller.id) {
              sellerCount++;
            }
          });
          let prices = product.offerData.offers.map(offer => {
            return offer.price;
          });
          productMap.push({
            ...product,
            sellerCount: sellerCount,
            title: product.title,
            rating: product.rating / 10,
            ean: product.ean,
            prices: prices,
            avgPrice: this.arrSum(prices) / sellerCount,
            sellers: product.offerData.offers.map(offer => {
              return offer.seller.id;
            }),
            image: product.images[0].url
          });
        });

        let newProductMap = [];
        let compareCart = JSON.parse(localStorage.getItem("compareCart")) || [];

        productMap.forEach(product => {
          let found = false;
          for (let i = 0; i < compareCart.length; i++) {
            if (compareCart[i].ean === product.ean) {
              found = true;
            }
          }
          if (found === false) {
            newProductMap.push(product);
          }
        });
        this.setState({ products: newProductMap, loading: false });
      } else {
        alert("no products found");
      }
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ loading: false });
      alert("oops, something went wrong");
      console.log("error", e);
    }
      } else {
          alert('please enter a product name or EAN to search');
      }
  };

  updateProducts = compareCart => {
    console.log(compareCart);
    this.state.products = this.state.products.filter(
      product => compareCart.indexOf(product) == -1
    );
    console.log("products finally", this.state.products);
    this.setState({ products: this.state.products });
  };
  render() {
    return (
      <div className="main-container">
        <div className="inner-wrapper">
          <div className="search-product">Search for a product</div>
          <form>
            <div className="row">
              <div className="form-group col-md-3">
                <Input
                  type="text"
                  placeholder="Type EAN or product name..."
                  className="item form-control"
                  value={this.state.text}
                  onChange={e => this.setState({ text: e.target.value })}
                />
              </div>
              <div className="form-group col-md-1">
                <Button
                  color="primary"
                  onClick={() => this.search(this.state.text)}
                  className="search-button"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="result">Results</div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList
            ProductList={this.state.products}
            updateProducts={this.updateProducts}
            loading={this.state.loading}
          />
        </Suspense>
      </div>
    );
  }
}

export default MainPage;
