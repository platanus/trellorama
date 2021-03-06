import moment from 'moment';
import { std, mode } from 'mathjs';

moment().format();

const decimalPadding = 2;

function sortDate(activity1, activity2) {
  return moment(activity1.date).diff(activity2.date, 'days');
}

function filterDuplicates(cards, reversed) {
  if (!reversed) {
    return cards
      .filter((card) =>
        cards.filter((filteredCard) => filteredCard.id === card.id).length === 1
      ).concat(Object.values(
        cards.filter((card) =>
          cards.filter((filteredCard) => filteredCard.id === card.id).length > 1
        ).sort(sortDate).reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {}))
      );
  }

  return cards
    .filter((card) =>
      cards.filter((filteredCard) => filteredCard.id === card.id).length === 1
    ).concat(Object.values(
      cards.filter((card) =>
        cards.filter((filteredCard) => filteredCard.id === card.id).length > 1
      ).reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {}))
    );
}

function getTimes(createdCards, finishedCards, returnCards = false) {
  return (
    finishedCards.map((finishedCard) => {
      if (returnCards) {
        if (createdCards.find((card) => card.id === finishedCard.id) === undefined) return { card: undefined, time: 0 };

        return {
          time: finishedCard.date.diff(createdCards.find((card) => card.id === finishedCard.id).date, 'days', true),
          card: finishedCard,
        };
      }
      if (createdCards.find((card) => card.id === finishedCard.id) === undefined) return 0;

      return finishedCard.date.diff(createdCards.find((card) => card.id === finishedCard.id).date, 'days', true);
    })
      .map((timeDiff) => {
        if (returnCards) {
          return timeDiff.time >= 0 ?
            { card: timeDiff.card, time: timeDiff.time } :
            { card: timeDiff.card, time: 0 };
        }

        return timeDiff >= 0 ? timeDiff : 0;
      }));
}

function getAverageTime(createdCards, finishedCards, padding) {
  return (getTimes(createdCards, finishedCards)
    .reduce((a, b) => a + b, 0) / finishedCards.length
  ).toFixed(padding === undefined ? decimalPadding : padding);
}

function getStandardDeviation(createdCards, finishedCards) {
  const querySet = finishedCards.map((finishedCard) => {
    if (createdCards.find((card) => card.id === finishedCard.id) === undefined) return 0;

    return finishedCard.date.diff(createdCards.find((card) => card.id === finishedCard.id).date, 'days', true);
  })
    .map((timeDiff) => (timeDiff >= 0 ? timeDiff : 0));
  if (querySet.length === 0) return 0;

  return std(querySet).toFixed(decimalPadding);
}

function getMode(createdCards, finishedCards) {
  const querySet = finishedCards.map((finishedCard) => {
    if (createdCards.find((card) => card.id === finishedCard.id) === undefined) return 0;

    return finishedCard.date.diff(createdCards.find((card) => card.id === finishedCard.id).date, 'days', true);
  })
    .map((timeDiff) => (timeDiff >= 0 ? timeDiff : 0))
    .map((diff) => Math.round(diff));
  if (querySet.length === 0) return 0;

  return mode(querySet).toString();
}

function getListCards(cardActivities, listId) {
  const createdCards = cardActivities.filter((activity) => activity.type === 'createCard')
    .filter((activity) => activity.data.list.id === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }));

  const updatedCards = filterDuplicates(cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => activity.data.listAfter.id === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id })), true);

  let initialCards = filterDuplicates(createdCards.concat(updatedCards), true);

  const finishedCards = filterDuplicates(cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => activity.data.listBefore.id === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }))
    .filter((card) => initialCards.map((startCard) => startCard.id).includes(card.id)), false);

  initialCards = initialCards.filter((card) => finishedCards.map((finishedCard) => finishedCard.id).includes(card.id));

  return [initialCards, finishedCards];
}

function getCardsBetweenTwoLists(cardActivities, startListIds, endListIds) {
  const createdCards = cardActivities.filter((activity) => activity.type === 'createCard')
    .filter((activity) => startListIds.includes(activity.data.list.id))
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }));

  const updatedCards = filterDuplicates(cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => startListIds.includes(activity.data.listAfter.id))
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id })), true);

  let initialCards = filterDuplicates(createdCards.concat(updatedCards), true);

  const finishedCards = filterDuplicates(cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => endListIds.includes(activity.data.listAfter.id))
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }))
    .filter((card) => initialCards.map((startCard) => startCard.id).includes(card.id)), false);

  initialCards = initialCards.filter((card) => finishedCards.map((finishedCard) => finishedCard.id).includes(card.id));

  return [initialCards, finishedCards];
}

export {
  getListCards,
  getAverageTime,
  getStandardDeviation,
  getMode,
  getCardsBetweenTwoLists,
  getTimes,
};
