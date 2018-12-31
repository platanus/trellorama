<template>
  <div id="app">
    <button v-on:click="swichSettings">Settings</button>
    <Settings v-if="seeSettings" v-bind:boards="boards"/>
    <BoardList v-if="!seeSettings" v-bind:boards="selectedBoards"/>
  </div>
</template>
<script>
import BoardList from './components/BoardList.vue';
import Settings from './components/Settings.vue';
import { authorize, request, onRequestError } from './utils/trelloManager.js';
import { get } from './utils/configurationPersistance.js';

/* global process */

authorize(process.env.VUE_APP_TRELLO_KEY);

export default {
  name: 'app',
  components: {
    BoardList,
    Settings,
  },
  data() {
    return {
      seeSettings: false,
      boards: [],
      boardIds: [],
      selectedBoards: [],
    };
  },
  mounted() {
    this.getBoards();
  },
  watch: {
    seeSettings() {
      this.boardIds = get('boards', []);
      this.selectedBoards = this.boards.filter((board) => this.boardIds.includes(board.id));
    },
    boards() {
      this.boardIds = get('boards', []);
      this.selectedBoards = this.boards.filter((board) => this.boardIds.includes(board.id));
    },
  },
  methods: {
    swichSettings() {
      this.seeSettings = !this.seeSettings;
    },
    getBoards() {
      const self = this;
      request(
        'members/me/boards',
        (response) => {
          self.boards = response.data;
        },
        () => {
          onRequestError(self.getBoards);
        }
      );
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
