import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        }
      },
      series: this.props.series || [{name: 'dummy', data: [0]}]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type={this.props.type}
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartComponent;