module.exports = {
  // 1. Percentage female versus male
  percentageCalculator(data, attribute, target) {
    console.log('data', data)
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
  },

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
  },

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
    let sortedStates = sortProperties(statesObj, total);
    let sortedStatesF = sortProperties(statesObjF, total);
    let sortedStatesM = sortProperties(statesObjM, total);

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
  },

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
  },

  getDataAndLabels(dataArr) {
    let data = [];
    let labels = [];
    for (let i = 0; i < dataArr.length; i++) {
      labels.push(dataArr[i][0]);
      data.push(dataArr[i][1]);
    }
    return { data, labels };
  },

  dataAndLabel(dataArr, labelArr) {
    let result = ''
    for(let i = 0; i < labelArr.length; i ++) {
      let label = labelArr[i]
      result += label + ': ' + dataArr[i] + ', '
    }
    return result.slice(0,result.length-2);
  }



}

// helper functions
function sortProperties(obj, total) {
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
