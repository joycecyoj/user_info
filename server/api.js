const router = require('express').Router();
const { percentageCalculator, namePercentage, statePercentage, ageRange, getDataAndLabels, dataAndLabel } = require('./helperFunction.js');
const convert = require('xml-js');

module.exports = router;

router.post('/info', (req, res, next) => {
  try {
    console.log('req.body===========', req.body)
    const inputData = req.body.results;         // JSON data
    const inputDataFormat = req.body.format;    // JSON, plain text, XML

    const genderPercentageArr = percentageCalculator(inputData,'gender','female');
    const firstNamePercentageArr = namePercentage(inputData, 'first', 'm');
    const lastNamePercentageArr = namePercentage(inputData, 'last', 'm');
    const statePercentageArrData = getDataAndLabels(statePercentage(inputData, 'state')).data
    const statePercentageArrLabel = getDataAndLabels(statePercentage(inputData, 'state')).labels
    const stateFemaleArrData = getDataAndLabels(statePercentage(inputData, 'state', 'female')).data
    const stateFemaleArrLabel = getDataAndLabels(statePercentage(inputData, 'state', 'female')).labels
    const stateMaleArrData = getDataAndLabels(statePercentage(inputData, 'state', 'male')).data
    const stateMaleArrLabel = getDataAndLabels(statePercentage(inputData, 'state', 'male')).labels
    const ageArr = ageRange(inputData)
    const ageLabel = ['0‐20', '21‐40', ' 41‐60', '61‐80', '81‐100', '100+']


    let text =
      "Percentage female versus male: " + genderPercentageArr[0] + "/" + genderPercentageArr[1] + "\n" +
      "Percentage of first names that start with A‐M versus N‐Z: " + firstNamePercentageArr[0] + "/" + firstNamePercentageArr[1] + "\n" +
      "Percentage of last names that start with A‐M versus N‐Z: " + lastNamePercentageArr[0] + "/" + lastNamePercentageArr[1] + "\n" +
      "Percentage of people in each state - top 10 states: " + dataAndLabel(statePercentageArrData, statePercentageArrLabel) + "\n" +
      "Percentage of female in each state - top 10 states: " + dataAndLabel(stateFemaleArrData, stateFemaleArrLabel) + "\n" +
      "Percentage of male in each state - top 10 states: " + dataAndLabel(stateMaleArrData, stateMaleArrLabel) + "\n" +
      "Percentage of people in the following age ranges: " + dataAndLabel(ageArr, ageLabel) + "\n"

    let json = {
      gender: {
        data: genderPercentageArr,
        label: ['Female', 'Male']
      },
      firstName: {
        data: firstNamePercentageArr,
        labels: [
          'First names that start with A‐M',
          'First names that start with N‐Z',
        ]
      },
      lastName: {
        data: lastNamePercentageArr,
        labels: [
          'Last names that start with A‐M',
          'Last names that start with N‐Z',
        ]
      },
      state: {
        data: statePercentageArrData,
        label: statePercentageArrLabel
      },
      stateFemale: {
        data: stateFemaleArrData,
        label: stateFemaleArrLabel
      },
      stateMale: {
        data: stateMaleArrData,
        label: stateMaleArrLabel
      },
      age: {
        data: ageArr,
        labels: ['0‐20', '21‐40', ' 41‐60', '61‐80', '81‐100', '100+']
      }
    }

    if (inputDataFormat === 'XML') {
      const options = {compact: true, ignoreComment: true, spaces: 4};
      const xmlOutput = convert.json2xml(json, options);
      res.set({"Content-Disposition":"attachment; filename=info.XML"})
      res.status(201).send(xmlOutput);
    } else if (inputDataFormat === 'text') {
      res.set({"Content-Disposition":"attachment; filename=info.txt"})
      res.status(201).send(text);
    } else {
      res.set({"Content-Disposition":"attachment; filename=info.json"})
      res.status(201).send(json);
    }

  } catch (error) { next(error) }
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})
