import moment from 'moment';

moment().format();

const millisecondsPerDay = 86400000;
const millisecondsPerHour = 3600000;
const millisecondsPerMinute = 60000;
const millisecondsPerSecond = 1000;

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

function parseTime(timeDifference) {
  let milliseconds = timeDifference;

  const days = Math.floor(milliseconds / millisecondsPerDay);
  milliseconds -= (days * millisecondsPerDay);

  const hours = Math.floor(milliseconds / millisecondsPerHour);
  milliseconds -= (hours * millisecondsPerHour);

  const minutes = Math.floor(milliseconds / millisecondsPerMinute);
  milliseconds -= (minutes * millisecondsPerMinute);

  const seconds = Math.floor(milliseconds / millisecondsPerSecond);

  return [days, hours, minutes, seconds];
}

function getAverageTime(createdCards, finishedCards) {
  return finishedCards.map((finishedCard) => finishedCard.date - createdCards.filter((card) => card.id === finishedCard.id)[0].date)
    .reduce((a, b) => a + b, 0) / finishedCards.length;
}

export default function (cardActivities, listId, leadTIme = true) {
  const finishedCards = cardActivities.filter((activity) => activity.type === 'updateCard')
    .filter((activity) => (leadTIme ? activity.data.listAfter.id : activity.data.listBefore.id) === listId)
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }))
    .filter((card, _, self) => filterDuplicates(card, _, self));

  const createdCards = cardActivities.filter((acitvity) => acitvity.type === 'createCard')
    .filter((activity) => finishedCards.map((card) => card.id).includes(activity.data.card.id))
    .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }));
  if (!leadTIme) {
    createdCards.concat(cardActivities.filter((activity) => activity.type === 'updateCard')
      .filter((activity) => activity.data.listAfter.id === listId)
      .map((activity) => ({ id: activity.data.card.id, date: moment(activity.date), activityId: activity.id }))
      .filter((card, _, self) => filterDuplicates(card, _, self)));
  }

  return parseTime(getAverageTime(createdCards, finishedCards));
}
