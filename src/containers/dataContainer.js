import React, { Component } from 'react';
import { connect } from 'react-redux';
const RadarChart = require("react-chartjs").Radar;

class Data extends Component {
  constructor(props) {
    super(props);
  }

  organizeData(dataTone) {
    let labels = dataTone[0].tones.map(item => {
      return item.tone_name
    });
    let numberOfDataSets = dataTone.length;
    let dataScore = dataTone.map(item => {
      return item.tones.map(tone => {
        return tone.score
      })
    })
    let data = [];
    for (let i = 0; i < dataScore[0].length; i++) {
      let current = 0;
      for (let j = 0; j < dataScore.length; j++) {
        current += dataScore[j][i];
      }
      current = current / numberOfDataSets;
      data.push(current);
    }
    return {
      labels,
      data
    }
  }

  render() {
    let newData = this.organizeData(this.props.data);
    console.log("NEW DATA", newData.labels);
    let data = {
      labels: newData.labels,
      datasets: [
          {
            backgroundColor: "rgba(33, 52, 218, 0.2)",
            borderColor: "rgba(31, 37, 85, 1)",
            pointBackgroundColor: "rgba(80, 28, 121, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(171, 170, 73, 1)",
            data: newData.data
          }
      ]
    };

    return (
      <div>
        <h2>Data:</h2>
        <RadarChart
          data={data}
          width="600"
          height="600"
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.data;
}

export default connect(mapStateToProps)(Data);
