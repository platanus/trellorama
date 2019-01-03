import { getDate } from './dateManager.js';
import { getLabels, buildChartDataSets, fillDatasetGaps, fillFromStartDate } from './chartUtils.js';

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
  const activitiesData = activities.map((activity) =>
    getActivityData(
      activity,
      dateParameters.dateTypeSelector,
      dateParameters.dayOfWeek
    ))
    .filter((activity) => activity !== null)
    .filter((activity) => listIds.includes(activity.list.id));
  if (retroactiveFill) {
    fillRetroactively(activitiesData, listIds);
  }

  const dateLabels = getLabels(activitiesData);

  const chartDataset = buildChartDataSets(activitiesData, dateLabels, listIds);
  fillDatasetGaps(
    dateLabels,
    chartDataset,
    { dateTypeSelector: dateParameters.dateTypeSelector, dayOfWeek: dateParameters.dayOfWeek },
    true
  );
  fillFromStartDate(
    dateLabels,
    chartDataset,
    {
      dateTypeSelector: dateParameters.dateTypeSelector,
      dayOfWeek: dateParameters.dayOfWeek,
      startDate: dateParameters.startDate,
    },
    true
  );

  return {
    labels: dateLabels,
    datasets: chartDataset,
  };
}
