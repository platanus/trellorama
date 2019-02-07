import { request, onRequestError } from '../utils/trelloManager.js';

const activitiesRequestLimit = 1000;

function getBoards() {
  return request(
    'members/me/boards',
    (response) => response.data,
    () => {
      onRequestError(getBoards);
    }
  );
}

function getLabels(boardId) {
  return request(
    `boards/${boardId}/labels`,
    (response) => response.data,
    () => {
      onRequestError(getLabels(boardId));
    }
  );
}

function getMembers(boardId) {
  return request(
    `boards/${boardId}/members`,
    (response) => response.data,
    () => {
      onRequestError(getMembers(boardId));
    },
    {
      fields: 'id,username,avatarHash',
    }
  );
}

function getLists(boardId, listIds) {
  return request(
    `boards/${boardId}/lists`,
    (response) => response.data.filter((element) => listIds.includes(element.id)),
    () => {
      onRequestError(getLists, [boardId, listIds]);
    }
  );
}

function getAllCards(listId, includeArchived) {
  const cardsFilter = includeArchived ? 'all' : 'open';

  return request(
    `lists/${listId}`,
    (response) => ({ data: response.data.cards, listId }),
    () => {
      onRequestError(getAllCards, [listId, includeArchived]);
    },
    { cards: cardsFilter }
  );
}

function getAllCardsActivities(boardId, before = null) {
  return request(
    `boards/${boardId}/actions`,
    (response) => response.data,
    () => {
      onRequestError(getAllCardsActivities, [boardId]);
    },
    {
      filter: 'createCard,updateCard:idList',
      limit: 1000,
      before,
    }
  );
}

export async function setBoards({ commit }) {
  commit('saveBoards', await getBoards());
}

export async function setLabels({ commit }, payload) {
  commit('saveLabels', await getLabels(payload.boardId));
}

export async function setMembers({ commit }, payload) {
  commit('saveMembers', await getMembers(payload.boardId));
}

export async function setLists({ commit }, payload) {
  commit('saveLists', await getLists(payload.boardId, payload.listIds));
}

export async function setCardByList({ commit }, payload) {
  commit('saveAllCardsByList', await getAllCards(payload.listId, payload.archived));
}

export async function setcardsActivities({ commit }, payload) {
  const data = await getAllCardsActivities(payload.boardId, payload.before);
  commit('saveAllCardsActivities', { ...payload, data });

  return data;
}

export async function getBoardData({ dispatch, commit }, payload) {
  await dispatch('setLabels', payload);
  await dispatch('setMembers', payload);
  await dispatch('setLists', payload);
  await payload.listIds.forEach((listId) => {
    dispatch('setCardByList', {
      listId,
      archived: payload.archived.includes(listId),
    });
  });
  let data = await dispatch('setcardsActivities', { ...payload, clean: true, before: null });
  while (data.length === activitiesRequestLimit) {
    data = await dispatch('setcardsActivities', {
      ...payload,
      before: data[activitiesRequestLimit - 1].date,
      clean: false,
    });
  }

  commit('isReady');
}
