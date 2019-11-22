import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./ChartComponent.css";
class ChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        }
      },
      series: this.props.series || [{ name: "dummy", data: [0] }]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              className={this.props.enlarge && "enlarge"}
              options={this.state.options}
              series={[this.props.series]}
              type={this.props.type}
              width={this.props.width ? this.props.width : "500"}
              height={this.props.height ? this.props.height : "auto"}
              options={{
                grid: {
                  show: true,
                  xaxis: {
                    lines: {
                      show: false
                    }
                  },
                  yaxis: {
                    lines: {
                      show: false
                    }
                  }
                },
                stroke: {
                  show: true,
                  curve: "smooth"
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartComponent;
