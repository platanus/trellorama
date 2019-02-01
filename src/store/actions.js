import { request, onRequestError } from '../utils/trelloManager.js';

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

export async function setBoards({ commit }) {
  commit('saveBoards', await getBoards());
}

export async function setLabels({ commit }, boardId) {
  commit('saveLabels', await getLabels(boardId));
}

export async function setMembers({ commit }, boardId) {
  commit('saveMembers', await getMembers(boardId));
}

export async function getBoardData({ dispatch }, boardId) {
  await dispatch('setLabels', boardId);
  await dispatch('setMembers', boardId);
}
