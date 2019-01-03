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
  const finalDate = (endDate === null) ? moment() : moment(endDate);
  const initialDate = (startDate === null) ? filteredActivities[0].date : startDate;

  return (filteredActivities.length / (filteredActivities.length === 0 ? 1 : finalDate.diff(initialDate, 'weeks'))).toFixed(1);
}

export {
  filterActivities,
  speedProjection,
};
