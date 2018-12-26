import { getDate } from './dateManager.js';

function filterActivities(activities, endListId, dateTypeSelector, dayOfWeek = 'monday') {
  return activities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => activity.data.listAfter.id === endListId)
    .map((activity) => ({ id: activity.data.card.id, date: getDate(activity.date, dateTypeSelector, dayOfWeek) }))
    .sort((card) => card.date);
}

function speedProjection(filteredActivities) {
  return (filteredActivities.length / [...new Set(filteredActivities
    .map((card) => card.date))].length).toFixed(1);
}

export {
  filterActivities,
  speedProjection,
};
