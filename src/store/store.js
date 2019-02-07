import Vuex from 'vuex';
import Vue from 'vue';
import * as actions from './actions.js';
import * as mutations from './mutations.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    boards: [],
    labels: [],
    members: [],
    lists: [],
    allCardsByList: {},
    allCardsActivities: [],
    ready: false,
  },
  mutations,
  actions,
});

export default store;
