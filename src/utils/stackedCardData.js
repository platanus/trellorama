import getDate from './getDate.js';

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

function getActivityData(activity, dateTypeSelector, dayOfWeek) {
  if (activity.type === 'updateCard') {
    return {
      date: getDate(activity.date, dateTypeSelector, dayOfWeek),
      list: activity.data.listAfter,
      id: activity.data.card.id,
    };
  }
  if (activity.type === 'createCard') {
    return {
      date: getDate(activity.date, dateTypeSelector, dayOfWeek),
      list: activity.data.list,
      id: activity.data.card.id,
    };
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
    cubicInterpolationMode: 'monotone',
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

function fillRetroactively(activities, listIds) {
  listIds.slice(1).forEach((currentList, currentIndex) => {
    activities.filter((activity) => activity.list.id === currentList)
      .forEach((currentActivity) => {
        listIds.slice(0, currentIndex + 1).forEach((previousList) => {
          const previousActivitie = activities.filter((activity) => activity.list.id === previousList)
            .filter((prevAct) => prevAct.id === currentActivity.id);
          if (previousActivitie.length === 0) {
            activities.push({
              date: currentActivity.date,
              list: { id: previousList, name: '' },
              id: currentActivity.id,
            });
          }
        });
      });
  });
}

export default function (activities, listIds, retroactiveFill, dateParameters) {
  const activitiesData = activities.map((activity) => getActivityData(activity, ...dateParameters))
    .filter((activity) => activity !== null)
    .filter((activity) => listIds.includes(activity.list.id));
  if (retroactiveFill) {
    fillRetroactively(activitiesData, listIds);
  }

  const dateLabels = getLabels(activitiesData);

  const chartDataset = buildChartDataSets(activitiesData, dateLabels, listIds);

  return {
    labels: dateLabels,
    datasets: chartDataset,
  };
}
