import moment from 'moment';
import { getDate } from './dateManager.js';

moment().format('yyyy-MM-dd');

function sortDate(activity1, activity2) {
  return moment(activity1.date).diff(activity2.date, 'days');
}

function filterActivitiesByMovedTwiceInSameList(activity, _, array) {
  return array.filter((filterActivity) => filterActivity.id === activity.id)
    .sort((activity1, activity2) => (activity1.date - activity2.date))[0]
    .id === activity.id;
}

function filterDuplicates(activity, _, array) {
  if (array.filter((filterActivity) => filterActivity.id === activity.id).length === 1) {
    return true;
  }

  return filterActivitiesByMovedTwiceInSameList(activity, _, array);
}

function filterActivities(activities, endListIds, dateTypeSelector, dayOfWeek = 'monday') {
  return activities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => endListIds.includes(activity.data.listAfter.id))
    .map((activity) => ({ id: activity.data.card.id, date: getDate(activity.date, dateTypeSelector, dayOfWeek) }))
    .filter((activity, _, array) => filterDuplicates(activity, _, array))
    .sort(sortDate);
}

function speedProjection(filteredActivities, startDate, endDate) {
  const finalDate = (endDate === null) ? moment() : moment(endDate);
  const initialDate = (startDate === null) ? filteredActivities[0].date : startDate;

  return (filteredActivities.length / Math.ceil(
    filteredActivities.length === 0 ? 1 : finalDate.diff(initialDate, 'weeks', true)
  ))
    .toFixed(1);
}

export {
  filterActivities,
  speedProjection,
};
