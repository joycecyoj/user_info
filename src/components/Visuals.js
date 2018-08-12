import React, { Component } from 'react';
import Chart from 'chart.js';

class Visuals extends Component {
  constructor(props) {
    super()
  }



  render() {
    const { file } = this.props || []
    console.log('file in visuals', file)

    var myChart = new Chart(ctx, {...});


    return (

      <div>
        <h1>VISUALSSSSSSSS</h1>

      </div>
    )
  }
}
export default Visuals;




// 1. Percentage female versus male
// 2. Percentage of first names that start with A‐M versus N‐Z
// 3. Percentage of last names that start with A‐M versus N‐Z
// 4. Percentage of people in each state, up to the top 10 most populous states
// 5. Percentage of females in each state, up to the top 10 most populous states
// 6. Percentage of males in each state, up to the top 10 most populous states
// 7. Percentage of people in the following age ranges: 0‐20, 21‐40, 41‐60, 61‐80, 81‐100,
// 100+
