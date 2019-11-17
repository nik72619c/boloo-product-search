import React, { Component, Suspense } from "react";
import "./Dashboard.css";
// import CompareCart from "../compare-cart/CompareCart";
const CompareCart = React.lazy(() => import("../compare-cart/CompareCart"));
const ChartComponent = React.lazy(() => import("../charts/ChartComponent"));
//import ChartComponent from "../charts/ChartComponent";

export default class Dashboard extends React.Component {
  render() {
    let compareCart = JSON.parse(localStorage.getItem("compareCart")) || [];
    let series = [];
    compareCart.forEach(item => {
      series.push({
        name: item.title,
        data: item.prices
      });
    });
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <CompareCart />
        </Suspense>
        <div className="main-wrapper enlarge">
          <Suspense fallback={<div>Loading...</div>}>
            <ChartComponent
              type="line"
              series={series}
              width={900}
              height={390}
              className="item1"
              enlarge={true}
            />
          </Suspense>
          <div className="side-chart-wrapper">
            <Suspense fallback={<div>Loading...</div>}>
              <ChartComponent type="line" series={series} width={300} />
              <ChartComponent type="bar" series={series} width={300} />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
