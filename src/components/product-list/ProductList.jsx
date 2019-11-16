import React from "react";
import "./main.css";
import { Table } from "reactstrap";
import Button from "reactstrap/lib/Button";

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      compareCart: JSON.parse(localStorage.getItem("compareCart")) ? JSON.parse(localStorage.getItem("compareCart")): []
    }
  }

  addToCart = (ean)=>{
    
     this.props.ProductList.forEach((product)=>{
           if(product.ean === ean){
             this.state.compareCart.push(product);
             this.setState({compareCart: this.state.compareCart},
              ()=>{
                localStorage.setItem("compareCart",JSON.stringify(this.state.compareCart));
                this.props.updateProducts(this.state.compareCart);
             });
           }
     })
  }

  render() {
    // this.props.ProductList = this.props.ProductList.map(product=>{
    //   if(this.state.compareCart.indexOf(product)===-1){
    //       return product
    //   }
    // });
    console.log('compare cart is', this.state.compareCart);
    return (
      <div>
        <Table hover borderless>
          <thead>
            <tr>
              <th>Product Information</th>
              <th>Average Price</th>
              <th>Lowest Price</th>
              <th>Average Rating</th>
              <th>No of Sellers</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.ProductList &&
              this.props.ProductList.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="column-1-wrapper">
                        <div className="column-1-item1">
                          <img src={product.image} className="image-medium" />
                        </div>

                        <div className="column-1-item2 inner-wrapper">
                          <div className="inner-item">{product.title}</div>
                          <div className="inner-item">{product.ean}</div>
                        </div>
                      </div>
                    </td>
                    <td>price</td>
                    <td>{product.prices.sort()[0]}</td>
                    <td>{product.rating}</td>
                    <td>sellers</td>
                    <td>
                      <Button outline color="primary" onClick={()=>this.addToCart(product.ean)}>
                        {this.props.actionName ? this.props.actionName : "Add to Cart"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}
