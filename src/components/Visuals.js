import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { percentageCalculator, namePercentage, statePercentage, ageRange, getDataAndLabels } from '../helperFunction.js';

class Visuals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: {
        datasets: [
          {
            data: [],
            backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
          },
        ],
        labels: [],
      },
      firstName: {
        datasets: [
          {
            data: [],
            backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
          },
        ],
        labels: [],
      },
      lastName: {
        datasets: [
          {
            data: [],
            backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
          },
        ],
        labels: [],
      },
      top10states: {
        datasets: [
          {
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
            ],
          },
        ],
        labels: [],
      },
      top10statesFemale: {
        datasets: [
          {
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
            ],
          },
        ],
        labels: [],
      },
      top10statesMale: {
        datasets: [
          {
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
            ],
          },
        ],
        labels: [],
      },
      age: {
        datasets: [
          {
            data: [],
            backgroundColor: [
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)'
            ]
            },
          ],
        labels: [],
      },
    };
  }

  componentDidMount() {
    this.setState({
      gender: {
        datasets: [
          {
            data: percentageCalculator(
              this.props.data,
              'gender',
              'female'
            ),
          },
        ],
        labels: ['Female', 'Male'],
      },
      firstName: {
        datasets: [
          {
            data: namePercentage(this.props.data, 'first', 'm'),
          },
        ],
        labels: [
          'First names that start with A‐M',
          'First names that start with N‐Z',
        ],
      },
      lastName: {
        datasets: [
          {
            data: namePercentage(this.props.data, 'last', 'm'),
          },
        ],
        labels: [
          'Last names that start with A‐M',
          'Last names that start with N‐Z',
        ],
      },
      top10states: {
        datasets: [
          {
            data: getDataAndLabels(statePercentage(this.props.data, 'state')).data,
          },
        ],
        labels: getDataAndLabels(statePercentage(this.props.data, 'state')).labels,
      },
      top10statesFemale: {
        datasets: [
          {
            data: getDataAndLabels(statePercentage(this.props.data, 'state', 'female')).data,
          },
        ],
        labels: getDataAndLabels(statePercentage(this.props.data, 'state', 'female')).labels,
      },
      top10statesMale: {
        datasets: [
          {
            data: getDataAndLabels(statePercentage(this.props.data, 'state', 'male')).data
          },
        ],
        labels: getDataAndLabels(statePercentage(this.props.data, 'state', 'male')).labels,
      },
      age: {
        datasets: [
          {
            data: ageRange(this.props.data)
          },
        ],
        labels: ['0‐20', '21‐40', ' 41‐60', '61‐80', '81‐100', '100+'],
      },
    });
  }

  render() {
    console.log('state--------', this.state);

    return (
      <div>
        <Doughnut
          data={this.state.gender}
          // width={1}
          // height={10}
          options={{
            title: {
              display: true,
              text: '1. Percentage female versus male',
              fontSize: 25,
            },
            maintainAspectRatio: true,
          }}
        />

        <Doughnut
          data={this.state.firstName}
          // width={40}
          // height={40}
          options={{
            title: {
              display: true,
              text:
                '2. Percentage of first names that start with A‐M versus N‐Z',
              fontSize: 25,
            },
            maintainAspectRatio: true,
          }}
        />

        <Doughnut
          data={this.state.lastName}
          // width={40}
          // height={40}
          options={{
            title: {
              display: true,
              text:'3. Percentage of last names that start with A‐M versus N‐Z',
              fontSize: 25,
            },
            maintainAspectRatio: true,
          }}
        />

        <Bar
          data={this.state.top10states}
          // width={40}
          // height={40}
          options={{
            title: {
              display: true,
              text: '4. Percentage of people in each state - Top 10 states',
              fontSize: 25,
            },
            maintainAspectRatio: true,
          }}
        />

        <Bar
          data={this.state.top10statesFemale}
          // width={40}
          // height={40}
          options={{
            title: {
              display: true,
              text: '5. Percentage of female in each state - Top 10 states',
              fontSize: 25,
            },
            maintainAspectRatio: true,
          }}
        />

        <Bar
          data={this.state.top10statesMale}
          // width={40}
          // height={40}
          options={{
            title: {
              display: true,
              text: '6. Percentage of male in each state - Top 10 states',
              fontSize: 25,
            },
            maintainAspectRatio: true,
          }}
        />

        <Doughnut
          data={this.state.age}
          // width={40}
          // height={40}
          options={{
            title: {
              display: true,
              text: '7. Percentage of people in the following age ranges: 0‐20, 21‐40, 41‐60, 61‐80, 81‐100, 100+',
              fontSize: 25,
            },
            maintainAspectRatio: true,
          }}
        />


      </div>
    );
  }
}
export default Visuals;

// 1. Percentage female versus male
// data = {
//   datasets: [{
//       data: [10, 20]
//   }],
//   labels: [
//       'male',
//       'female',
//   ]
// };

// 2. Percentage of first names that start with A‐M versus N‐Z
// 3. Percentage of last names that start with A‐M versus N‐Z
// 4. Percentage of people in each state, up to the top 10 most populous states
// 5. Percentage of females in each state, up to the top 10 most populous states
// 6. Percentage of males in each state, up to the top 10 most populous states
// 7. Percentage of people in the following age ranges: 0‐20, 21‐40, 41‐60, 61‐80, 81‐100,
// 100+
