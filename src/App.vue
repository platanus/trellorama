<template>
  <div id="app">
    <div v-if="authorized">
      <button v-on:click="swichSettings" v-if="!seeSettings">Settings</button>
      <BoardWizard
        v-if="seeSettings"
        v-bind:boards="boards"
        @leaveWizard="swichSettings"
      />
      <BoardList v-else v-bind:boards="selectedBoards"/>
    </div>
    <LandingPage v-else/>
  </div>
</template>
<script>
import BoardList from './components/BoardList.vue';
// import Settings from './components/Settings.vue';
import { request, onRequestError, isAuthorized } from './utils/trelloManager.js';
import { get } from './utils/configurationPersistance.js';
import BoardWizard from './components/BoardWizard.vue';
import LandingPage from './components/LandingPage.vue';

export default {
  name: 'app',
  components: {
    BoardList,
    // Settings,
    BoardWizard,
    LandingPage,
  },
  data() {
    return {
      seeSettings: false,
      boards: [],
      boardIds: [],
      selectedBoards: [],
    };
  },
  computed: {
    authorized() {
      return isAuthorized();
    },
  },
  mounted() {
    if (isAuthorized()) this.getBoards();
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
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
