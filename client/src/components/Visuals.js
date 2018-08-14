import React, { Component } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';

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
            backgroundColor: ['#623CEA', '#E3B505'],
          },
        ],
        labels: [],
      },
      lastName: {
        datasets: [
          {
            data: [],
            backgroundColor: ['#25CED1', '#0CF574'],
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
              '#25CED1',
              '#0CF574',
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
              '#E3B505',
              '#623CEA',
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
              '#25CED1',
              '#0CF574',
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
              'rgba(75, 192, 192, 0.8)',
            ],
          },
        ],
        labels: [],
      },
    };
  }

  componentDidMount() {
    console.log('props data', this.props.data);

    axios.post('/api/info', this.props.data).then(response => {
      console.log('response from axios===========', response.data);

      this.setState({
        gender: {
          datasets: [
            {
              data: response.data.gender.data,
            },
          ],
          labels: ['Female', 'Male'],
        },
        firstName: {
          datasets: [
            {
              data: response.data.firstName.data,
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
              data: response.data.lastName.data,
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
              data: response.data.state.data,
            },
          ],
          labels: response.data.state.label,
        },
        top10statesFemale: {
          datasets: [
            {
              data: response.data.stateFemale.data,
            },
          ],
          labels: response.data.stateFemale.label,
        },
        top10statesMale: {
          datasets: [
            {
              data: response.data.stateMale.data,
            },
          ],
          labels: response.data.stateMale.label,
        },
        age: {
          datasets: [
            {
              data: response.data.age.data,
            },
          ],
          labels: ['0‐20', '21‐40', ' 41‐60', '61‐80', '81‐100', '100+'],
        },
      });
    });
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'top',
    layout: {
      padding: {
        bottom: 100,
      },
    },
  };

  render() {
    console.log('state--------', this.state);

    return (
      <div className="chart-container">
        <div className="description-container">
          <h2>The following charts display your data in 7 ways:</h2>
          <div className="description-text">
            <ul>
              <p>1. Percentage female versus male</p>
              <p>2. Percentage of first names that start with A‐M versus N‐Z</p>
              <p>3. Percentage of last names that start with A‐M versus N‐Z</p>
              <p>
                4. Percentage of people in each state, up to the top 10 most
                populous states
              </p>
              <p>
                5. Percentage of females in each state, up to the top 10 most
                populous states
              </p>
              <p>
                6. Percentage of males in each state, up to the top 10 most
                populous states
              </p>
              <p>
                7. Percentage of people in the following age ranges: 0‐20,
                21‐40, 41‐60, 61‐80, 81‐100,100+
              </p>
            </ul>
          </div>
        </div>

        <div>
          <Doughnut
            data={this.state.gender}
            options={{
              title: {
                display: true,
                text: '1. Percentage female versus male',
                fontSize: 25,
              },
              layout: this.props.layout,
            }}
          />
        </div>

        <div>
          <Doughnut
            data={this.state.firstName}
            options={{
              title: {
                display: true,
                text:
                  '2. Percentage of first names that start with A‐M versus N‐Z',
                fontSize: 25,
              },
              layout: this.props.layout,
            }}
          />
        </div>

        <div>
          <Doughnut
            data={this.state.lastName}
            options={{
              title: {
                display: true,
                text:
                  '3. Percentage of last names that start with A‐M versus N‐Z',
                fontSize: 25,
              },
              layout: this.props.layout,
            }}
          />
        </div>

        <div>
          <Pie
            data={this.state.top10states}
            options={{
              title: {
                display: true,
                text: '4. Percentage of people in each state - Top 10 states',
                fontSize: 25,
              },
              layout: this.props.layout,
            }}
          />
        </div>

        <div>
          <Pie
            data={this.state.top10statesFemale}
            options={{
              title: {
                display: true,
                text: '5. Percentage of female in each state - Top 10 states',
                fontSize: 25,
              },
              layout: this.props.layout,
            }}
          />
        </div>

        <div>
          <Pie
            data={this.state.top10statesMale}
            options={{
              title: {
                display: true,
                text: '6. Percentage of male in each state - Top 10 states',
                fontSize: 25,
              },
              layout: this.props.layout,
            }}
          />
        </div>

        <div>
          <Doughnut
            data={this.state.age}
            options={{
              title: {
                display: true,
                text:
                  '7. Percentage of people in the following age ranges: 0‐20, 21‐40, 41‐60, 61‐80, 81‐100, 100+',
                fontSize: 25,
              },
              layout: this.props.layout,
            }}
          />
        </div>
      </div>
    );
  }
}
export default Visuals;
