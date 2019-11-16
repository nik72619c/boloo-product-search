import React, {Component} from "react";
import CompareCart from "../compare-cart/CompareCart";
import ChartComponent from "../charts/ChartComponent";

export default class Dashboard extends React.Component {

    render(){
        let compareCart = JSON.parse(localStorage.getItem("compareCart")) || [];
        let series = [];
        compareCart.forEach(item => {
            series.push({
                name: item.title,
                data: item.prices
            })
        });
        return (
            <div>
               <CompareCart />
               <ChartComponent type="line" series={series} />
                {/* <ChartComponent />
                <ChartComponent /> */}
            </div>
        )
    }
}