import React from "react";
// import "./App.css";
import ProductList from "../product-list/ProductList";
import axios from "axios";
import { Button, Input } from "reactstrap";
import Navbar from '../navbar/Navbar';

class MainPage extends React.Component {
  state = {
    products: [],
    text: null
  };
  search = async text => {
    const params = {
      apikey: "BD3B9B7B148949609BF340E2626A4133",
      q: text,
      format: "json",
      includeattributes: true
    };
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json"
    };
    try {
      const response = await axios.get(
        "https://api.bol.com/catalog/v4/search",
        { params },
        { headers, credentials: true, crossDomain: true }
      );
      console.log(response);
      let productMap = [];
      response.data.products.forEach(product => {
        productMap.push({...product,
          title: product.title,
          rating: product.rating / 10,
          ean: product.ean,
          prices: product.offerData.offers.map(offer => {
            return offer.price;
          }),
          sellers: product.offerData.offers.map(offer => {
            return offer.seller.id;
          }),
          image: product.images[0].url
        });
      });

      let newProductMap = [];
      let compareCart = JSON.parse(localStorage.getItem("compareCart")) || [];

      productMap.forEach(product=>{
        let found=false;
        for(let i=0;i<compareCart.length;i++){
          if(compareCart[i].ean === product.ean){
             found=true;
          }
        }
        if(found === false) {
          newProductMap.push(product);
        }
      })
       this.setState({products: newProductMap});

    } catch (e) {
      console.log("error ", e);
    }
  }

  updateProducts = (compareCart)=>{
    console.log(compareCart);
          this.state.products = this.state.products.filter(product=>compareCart.indexOf(product)==-1);
            console.log('products finally', this.state.products);
            this.setState({products: this.state.products});
  }
  render() {
    if (false && this.state.products.length == 0) {
      return <div>empty product list</div>;
    } else
      return (
        <div className="container-fluid">
          <Navbar />
          <div className="input-wrapper">
            <Input
              type="text"
              placeholder="Type EAN or product name..."
              className="item"
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
            />
            <Button
              color="primary"
              onClick={() => this.search(this.state.text)}
              className="item"
            >
              Search
            </Button>
          </div>

          <ProductList ProductList={this.state.products} updateProducts={this.updateProducts}/>
        </div>
      );
  }
}

export default MainPage;
