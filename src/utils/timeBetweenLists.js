import moment from 'moment';

moment().format();

const millisecondsPerDay = 86400000;
const decimalPadding = 2;

function filterDuplicates(card, _, array) {
  if (array.filter((filterCard) => filterCard.id === card.id).length === 1) {
    return true;
  }
  if (array.filter(
    (filterCard) => filterCard.id === card.id).sort(
    (card1, card2) => card2.date - card1.date
  )[0].activityId === card.activityId
  ) {
    return true;
  }

  return false;
}

function parseTime(milliseconds) {
  const days = (milliseconds / millisecondsPerDay).toFixed(decimalPadding);

  return days;
}

function getAverageTime(createdCards, finishedCards) {
  return finishedCards.map((finishedCard) => finishedCard.date - createdCards.filter((card) => card.id === finishedCard.id)[0].date)
    .reduce((a, b) => a + b, 0) / finishedCards.length;
}

function leadTime(cardActivities, listId) {
  const finishedCards = cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => activity.data.listAfter.id === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }))
    .filter((card, _, self) => filterDuplicates(card, _, self));

  const createdCards = cardActivities.filter((activity) => activity.type === 'createCard')
    .filter((activity) => finishedCards.map((card) => card.id).includes(activity.data.card.id))
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }));

  return parseTime(getAverageTime(createdCards, finishedCards));
}

function timeInList(cardActivities, listId) {
  const finishedCards = cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => activity.data.listBefore.id === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }))
    .filter((card, _, self) => filterDuplicates(card, _, self));

  const createdCards = cardActivities.filter((activity) => activity.type === 'createCard')
    .filter((activity) => activity.data.list.id === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }));

  const updatedCards = cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => activity.data.listAfter.id === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }))
    .filter((card, _, self) => filterDuplicates(card, _, self));

  const initialCards = createdCards.concat(updatedCards)
    .filter((card, _, self) => filterDuplicates(card, _, self))
    .filter((card) => finishedCards.map((finishedCard) => finishedCard.id).includes(card.id));

  return parseTime(getAverageTime(initialCards, finishedCards));
}

export {
  leadTime,
  timeInList,
};
