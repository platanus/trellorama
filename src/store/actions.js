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

export async function setBoards({ commit }) {
  commit('saveBoards', await getBoards());
}

export function getLabels({ dispatch, commit }, boardId) {
  return request(
    `boards/${boardId}/labels`,
    (response) => {
      commit('setLabels', response.data);
    },
    () => {
      onRequestError(dispatch('getLabels', boardId));
    }
  );
}
