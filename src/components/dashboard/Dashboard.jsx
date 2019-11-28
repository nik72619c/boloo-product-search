import React, { Suspense } from "react";
import "./Dashboard.css";
const CompareCart = React.lazy(() => import("../compare-cart/CompareCart"));
const ChartComponent = React.lazy(() => import("../charts/ChartComponent"));

export default class Dashboard extends React.Component {
  render() {
    let compareCart = JSON.parse(localStorage.getItem("compareCart")) || [];
    let prices = compareCart.map(element => element.avgPrice.toFixed(2));
    console.log("avgPrices", prices);
    let ratings = compareCart.map(element => element.rating);
    console.log("ratings", ratings);
    let sellerCounts = compareCart.map(element => element.sellerCount);
    console.log("sellerCounts", sellerCounts);

    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <CompareCart />
        </Suspense>
        <div className="main-wrapper enlarge">
          <Suspense fallback={<div>Loading...</div>}>
            <ChartComponent
              type="line"
              series={{ name: "prices", data: prices }}
              width={'355%'}
              height={450}
              className="item1"
              enlarge={true}
            />
          </Suspense>
          <div className="side-chart-wrapper">
            <Suspense fallback={<div>Loading...</div>}>
              <ChartComponent
                type="line"
                series={{ name: "ratings", data: ratings }}
                width={300}
                height={220}
              />
              <ChartComponent
                type="bar"
                series={{ name: "seller count", data: sellerCounts }}
                width={300}
                height={220}
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
