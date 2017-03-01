import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radar } from 'react-chartjs-2';
import Waiting from '../components/waiting';

class Data extends Component {
  constructor(props) {
    super(props);
  }

  organizeData(dataTone) {
    let data = [];
    let labels = dataTone[0].tones.map(item => item.tone_name );
    let numberOfDataSets = dataTone.length;
    let dataScore = dataTone.map(item => {
      return item.tones.map(tone => {
        return tone.score
      })
    })

    for (let i = 0; i < dataScore[0].length; i++) {
      let current = 0;
      for (let j = 0; j < dataScore.length; j++) {
        current += dataScore[j][i];
      }
      current = current / numberOfDataSets;
      data.push(current.toFixed(5));
    }

    return {
      labels,
      data
    }
  }

  render() {
      let newData = this.organizeData(this.props.data);
      let data = {
        labels: newData.labels,
        datasets: [
          {
            label: "How are we feeling",
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

    const options = {
      legend: {
        display: false
        },
     tooltips: {
       enabled: false
     }
    }

    return (
      <div className="data">
          <Radar
            id="chart"
            data={ data }
            options= { options }
            />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.data;
}

export default connect(mapStateToProps)(Data);
