import moment from 'moment';
import { std, mode } from 'mathjs';

moment().format();

const decimalPadding = 2;

function filterCardsByMovedTwiceInSameList(card, _, array) {
  return array.filter((filterCard) => filterCard.id === card.id)
    .sort((card1, card2) => card2.date - card1.date)[0].activityId === card.activityId;
}

function filterDuplicates(card, _, array) {
  if (array.filter((filterCard) => filterCard.id === card.id).length === 1) {
    return true;
  }

  return filterCardsByMovedTwiceInSameList(card, _, array);
}

function getAverageTime(createdCards, finishedCards) {
  return (finishedCards.map((finishedCard) => finishedCard.date.diff(createdCards.find((card) => card.id === finishedCard.id).date, 'days', true))
    .map((timeDiff) => (timeDiff >= 0 ? timeDiff : 0))
    .reduce((a, b) => a + b, 0) / finishedCards.length).toFixed(decimalPadding);
}

function getStandardDeviation(createdCards, finishedCards) {
  return std(finishedCards.map((finishedCard) => finishedCard.date.diff(createdCards.find((card) => card.id === finishedCard.id).date, 'days', true))
    .map((timeDiff) => (timeDiff >= 0 ? timeDiff : 0))).toFixed(decimalPadding);
}

function getMode(createdCards, finishedCards) {
  return mode(finishedCards.map((finishedCard) => finishedCard.date.diff(createdCards.find((card) => card.id === finishedCard.id).date, 'days', true))
    .map((timeDiff) => (timeDiff >= 0 ? timeDiff : 0))
    .map((diff) => Math.round(diff)))[0].toFixed(decimalPadding);
}

function getBoardCards(cardActivities, listId) {
  const finishedCards = cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => activity.data.listAfter.id === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }))
    .filter((card, _, self) => filterDuplicates(card, _, self));

  const createdCards = cardActivities.filter((activity) => activity.type === 'createCard')
    .filter((activity) => finishedCards.map((card) => card.id).includes(activity.data.card.id))
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }));

  return [createdCards, finishedCards];
}

function getListCards(cardActivities, listId) {
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

  return [initialCards, finishedCards];
}

export {
  getListCards,
  getBoardCards,
  getAverageTime,
  getStandardDeviation,
  getMode,
};
