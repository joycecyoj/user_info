import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

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

  // 1. Percentage female versus male

  percentageCalculator(data, attribute, target) {
    let total = data.length;
    let targetCount = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i][attribute] === target) {
        targetCount++;
      }
    }
    return [
      ((targetCount / total) * 100).toFixed(2),
      (((total - targetCount) / total) * 100).toFixed(2),
    ];
  }

  // 2. Percentage of first names that start with A‐M versus N‐Z
  // 3. Percentage of last names that start with A‐M versus N‐Z
  namePercentage(data, attribute2, target) {
    let total = data.length;
    let targetCount = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]['name'][attribute2][0] <= target) {
        targetCount++;
      }
    }
    return [
      ((targetCount / total) * 100).toFixed(2),
      (((total - targetCount) / total) * 100).toFixed(2),
    ];
  }

  // 4. Percentage of people in each state, up to the top 10 most populous states
  // 5. Percentage of females in each state, up to the top 10 most populous states
  // 6. Percentage of males in each state, up to the top 10 most populous states
  statePercentage(data, attribute2, target) {
    // pass in male, female
    let statesObj = {};
    let statesObjF = {};
    let statesObjM = {};

    let stateCount = 1;
    let femaleCount = 1;
    let maleCount = 1;

    for (let i = 0; i < data.length; i++) {
      let stateName = data[i]['location'][attribute2];

      if (target === 'female') {
        if (data[i]['gender'] === target) {
          if (stateName in statesObjF) {
            statesObjF[stateName]++;
          } else {
            statesObjF[stateName] = femaleCount;
          }
        }
      } else if (target === 'male') {
        if (data[i]['gender'] === target) {
          if (stateName in statesObjM) {
            statesObjM[stateName]++;
          } else {
            statesObjM[stateName] = maleCount;
          }
        }
      }

      if (stateName in statesObj) {
        statesObj[stateName]++;
      } else {
        statesObj[stateName] = stateCount;
      }
    }

    let total = Object.keys(statesObj).length;
    let sortedStates = this.sortProperties(statesObj, total);
    let sortedStatesF = this.sortProperties(statesObjF, total);
    let sortedStatesM = this.sortProperties(statesObjM, total);

    let top10States = sortedStates.slice(0, 10);
    let top10StatesF = sortedStatesF.slice(0, 10);
    let top10StatesM = sortedStatesM.slice(0, 10);

    console.log('statesObj===============', statesObj);
    console.log('total===============', total);
    console.log('sortedStates==========', sortedStates);
    console.log('top10States===========', top10States);

    if (target === 'female') {
      return top10StatesF;
    } else if (target === 'male') {
      return top10StatesM;
    } else {
      return top10States;
    }
  }

  // 7. Percentage of people in the following age ranges: 0‐20, 21‐40, 41‐60, 61‐80, 81‐100, 100+
  ageRange(data) {
    let total = data.length;
    let ageObj = {
      '0-20': 0,
      '21-40': 0,
      '41-60': 0,
      '61-80': 0,
      '81-100': 0,
      '100+': 0,
    };
    for (let i = 0; i < data.length; i++) {
      if (data[i]['dob']['age'] <= 20) {
        ageObj['0-20']++;
      } else if (data[i]['dob']['age'] <= 40) {
        ageObj['21-40']++;
      } else if (data[i]['dob']['age'] <= 60) {
        ageObj['41-60']++;
      } else if (data[i]['dob']['age'] <= 80) {
        ageObj['61-80']++;
      } else if (data[i]['dob']['age'] <= 100) {
        ageObj['81-100']++;
      } else {
        ageObj['100+']++;
      }
    }

    let values = Object.values(ageObj);
    console.log('values========', values);
    let agePercentage = [];

    for (let i = 0; i < values.length; i++) {
      agePercentage.push((values[i] / total) * 100).toFixed(2);
    }
    return agePercentage;
  }

  // helper functions
  sortProperties(obj, total) {
    // convert object into array
    var sortable = [];
    for (var key in obj)
      if (obj.hasOwnProperty(key))
        sortable.push([key, ((obj[key] / total) * 100).toFixed(2)]); // each item is an array in format [key, value]

    // sort items by value
    sortable.sort(function(a, b) {
      return b[1] - a[1]; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }

  getDataAndLabels(dataArr) {
    let data = [];
    let labels = [];
    for (let i = 0; i < dataArr.length; i++) {
      labels.push(dataArr[i][0]);
      data.push(dataArr[i][1]);
    }
    return { data, labels };
  }

  componentDidMount() {
    this.setState({
      gender: {
        datasets: [
          {
            data: this.percentageCalculator(
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
            data: this.namePercentage(this.props.data, 'first', 'm'),
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
            data: this.namePercentage(this.props.data, 'last', 'm'),
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
            data: this.getDataAndLabels(
              this.statePercentage(this.props.data, 'state')
            ).data,
          },
        ],
        labels: this.getDataAndLabels(
          this.statePercentage(this.props.data, 'state')
        ).labels,
      },
      top10statesFemale: {
        datasets: [
          {
            data: this.getDataAndLabels(
              this.statePercentage(this.props.data, 'state', 'female')
            ).data,
          },
        ],
        labels: this.getDataAndLabels(
          this.statePercentage(this.props.data, 'state', 'female')
        ).labels,
      },
      top10statesMale: {
        datasets: [
          {
            data: this.getDataAndLabels(this.statePercentage(this.props.data, 'state', 'male')).data
          },
        ],
        labels: this.getDataAndLabels(
          this.statePercentage(this.props.data, 'state', 'male')
        ).labels,
      },
      age: {
        datasets: [
          {
            data: this.ageRange(this.props.data)
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
