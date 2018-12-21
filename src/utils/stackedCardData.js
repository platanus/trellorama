import moment from 'moment';

moment().format();

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

function getColor() {
  const color = globalColors[globalColorIndex];
  globalColorIndex = (globalColorIndex + 1) % globalColors.length;

  return color;
}

function getWeekYear(date) {
  const yearPadding = 100;
  const momentDate = moment(date);
  const year = momentDate.get('year') * yearPadding;
  const week = momentDate.get('week');
  const weekYear = year + week;

  return weekYear;
}

function getActivityData(activity) {
  if (activity.type === 'updateCard') {
    return { date: getWeekYear(activity.date), list: activity.data.listAfter };
  }
  if (activity.type === 'createCard') {
    return { date: getWeekYear(activity.date), list: activity.data.list };
  }

  return null;
}

function getLabels(activities) {
  return activities.map((element) => element.date)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
}

function countCardsByWeek(activities, week) {
  return activities.filter((activity) => activity.date === week).length;
}

function buildChartDataSet(filteredActivities, labels) {
  if (filteredActivities.length === 0) {
    return {
      label: [],
      data: [],
    };
  }
  const datasetName = filteredActivities[0].list.name;
  const datasetValues = labels.map((label) => countCardsByWeek(filteredActivities, label))
    .reduce((a, b, index) => [...a, b + (a[index - 1] || 0)], []);

  const colors = getColor();

  return {
    label: datasetName,
    data: datasetValues,
    fill: true,
    backgroundColor: colors[0],
    borderColor: colors[1],
  };
}

function buildChartDataSets(activities, labels, listIds) {
  return listIds.map(
    (listId) => buildChartDataSet(
      activities.filter((activity) => listId === activity.list.id),
      labels
    )
  );
}

export default function (activities, listIds) {
  let activitiesData = activities.map(getActivityData);
  activitiesData = activitiesData.filter((element) => element !== null);
  activitiesData = activitiesData.filter((element) => listIds.includes(element.list.id));

  const weekLabels = getLabels(activitiesData);

  const chartDataset = buildChartDataSets(activitiesData, weekLabels, listIds);

  return {
    labels: weekLabels,
    datasets: chartDataset,
  };
}
