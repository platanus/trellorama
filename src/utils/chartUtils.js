import moment from 'moment';
import { addToDate, getDate, getCurrentDate, subtractToDate } from '../utils/dateManager.js';

moment().format('yyyy-MM-dd');

const globalColors = [
  ['rgba(255, 0, 0, 0.1)', 'rgba(255, 0, 0, 0.5)'],
  ['rgba(0, 255, 0, 0.1)', 'rgba(0, 255, 0, 0.5)'],
  ['rgba(0, 0, 255, 0.1)', 'rgba(0, 0, 255, 0.5)'],
  ['rgba(244, 244, 65, 0.1)', 'rgba(244, 244, 65, 0.5)'],
  ['rgba(244, 124, 65, 0.1)', 'rgba(244, 124, 65, 0.5)'],
  ['rgba(65, 244, 211, 0.1)', 'rgba(65, 244, 211, 0.5)'],
  ['rgba(160, 65, 244, 0.1)', 'rgba(160, 65, 244, 0.5)'],
];
let globalColorIndex = 0;

function getColor(color) {
  let colorArray;
  switch (color) {
  case 'random':
    colorArray = globalColors[globalColorIndex];
    globalColorIndex = (globalColorIndex + 1) % globalColors.length;
    break;
  case 'blue':
    colorArray = ['rgba(0, 0, 255, 1)', 'rgba(0, 0, 255, 1)'];
    break;
  case 'red':
    colorArray = ['rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 1)'];
    break;
  case 'green':
    colorArray = ['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'];
    break;
  case 'black':
    colorArray = ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)'];
    break;
  case 'orange':
    colorArray = ['rgba(242, 132, 14, 0.5)', 'rgba(242, 132, 14, 0.5)'];
    break;
  default:
    colorArray = globalColors[globalColorIndex];
    globalColorIndex = (globalColorIndex + 1) % globalColors.length;
    break;
  }

  return colorArray;
}

function getLabels(activities) {
  return activities.map((element) => element.date)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
}

function countCardsByDate(activities, date) {
  return activities.filter((activity) => activity.date === date).length;
}

function buildChartDataSet(filteredActivities, labels, datasetName, lineParams = { color: 'random', fill: true }) {
  if (filteredActivities.length === 0) {
    return {
      label: [],
      data: [],
    };
  }
  const datasetValues = labels.map((label) => countCardsByDate(filteredActivities, label))
    .reduce((a, b, index) => [...a, b + (a[index - 1] || 0)], []);

  const colors = getColor(lineParams.color);

  return {
    label: datasetName,
    data: datasetValues,
    fill: lineParams.fill,
    backgroundColor: colors[0],
    borderColor: colors[1],
    cubicInterpolationMode: 'monotone',
  };
}

function buildChartDataSets(activities, labels, listIds) {
  return listIds.map(
    (listId) => buildChartDataSet(
      activities.filter((activity) => listId === activity.list.id),
      labels,
      activities.filter((activity) => listId === activity.list.id).length > 0 ? activities.filter((activity) => listId === activity.list.id)[0].list.name : ''
    )
  );
}

function increaseDataset(dateLabels, datasetData, index, nextLabel) {
  dateLabels.splice(index + 1, 0, nextLabel);
  datasetData.splice(index + 1, 0, datasetData[index]);
}

function fillDatasetGaps(dateLabels, datasetData, dateParams) {
  if (dateLabels.length === 0) return;
  let index = 0;
  const lastLabel = getDate(
    subtractToDate(getCurrentDate(), 1, dateParams.dateTypeSelector, { dayOfWeek: dateParams.dayOfWeek }),
    dateParams.dateTypeSelector,
    dateParams.dayOfWeek,
    true
  );
  let currentLabel = dateLabels[index];
  let nextLabel;
  while (moment(currentLabel).isSameOrBefore(lastLabel, 'day')) {
    nextLabel = addToDate(currentLabel, 1, dateParams.dateTypeSelector, dateParams.dayOfWeek);
    if (!dateLabels.includes(nextLabel)) increaseDataset(dateLabels, datasetData, index, nextLabel);
    index++;
    currentLabel = dateLabels[index];
  }
}

export {
  getLabels,
  buildChartDataSets,
  buildChartDataSet,
  getColor,
  fillDatasetGaps,
  increaseDataset,
};
