import moment from 'moment';

moment().format();

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
  let labels = activities.map((element) => element.date);
  labels = labels.filter((value, index, self) => self.indexOf(value) === index);
  labels.sort();

  return labels;
}

function countCardsByWeek(activities, week) {
  return activities.filter((activity) => activity.date === week).length;
}

function buildChartDataSet(filteredActivities, labels) {
  const datasetName = filteredActivities[0].list.name;
  let datasetValues = labels.map((label) => countCardsByWeek(filteredActivities, label));
  datasetValues = datasetValues.reduce((a, b, index) => [...a, b + (a[index - 1] || 0)], []);

  return {
    label: datasetName,
    data: datasetValues,
  };
}

function buildChartDataSets(activities, labels, listIds) {
  const datasets = listIds.map(
    (listId) => buildChartDataSet(
      activities.filter((activity) => listId === activity.list.id),
      labels
    )
  );

  return datasets;
}

export default function (activities, listIds) {
  let activitiesData = activities.map(getActivityData);
  activitiesData = activitiesData.filter((element) => element !== null);
  activitiesData = activitiesData.filter((element) => listIds.includes(element.list.id));

  const labels = getLabels(activitiesData);

  const chartDataset = buildChartDataSets(activitiesData, labels, listIds);

  return chartDataset;
}
