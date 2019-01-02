import moment from 'moment';
import { getDate } from './dateManager.js';

moment().format('yyyy-MM-dd');

function sortDate(activity1, activity2) {
  return moment(activity1.date).diff(activity2.date, 'days');
}

function filterActivities(activities, endListId, dateTypeSelector, dayOfWeek = 'monday') {
  return activities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => activity.data.listAfter.id === endListId)
    .map((activity) => ({ id: activity.data.card.id, date: getDate(activity.date, dateTypeSelector, dayOfWeek) }))
    .sort(sortDate);
}

function speedProjection(filteredActivities, startDate, endDate) {
  let finalDate;
  if (endDate === null) {
    finalDate = moment();
  } else {
    finalDate = moment(endDate);
  }
  let initialDate;
  if (startDate === null) {
    initialDate = filteredActivities[0].date;
  } else {
    initialDate = startDate;
  }

  return (filteredActivities.length / (filteredActivities.length === 0 ? 1 : finalDate.diff(initialDate, 'weeks'))).toFixed(1);
}

export {
  filterActivities,
  speedProjection,
};
