<template>
  <div id="app" class="app">
    <div v-if="authorized">
      <BoardWizard
        v-if="seeSettings"
        v-bind:boards="boards"
        @setSettings="setSettings"
      />
      <BoardList v-else v-bind:boards="selectedBoards" @setSettings="setSettings"/>
    </div>
    <LandingPage v-else/>
  </div>
</template>
<script>
import BoardList from './components/BoardList.vue';
import { request, onRequestError, isAuthorized } from './utils/trelloManager.js';
import { get } from './utils/configurationPersistance.js';
import BoardWizard from './components/BoardWizard.vue';
import LandingPage from './components/LandingPage.vue';

export default {
  name: 'app',
  components: {
    BoardList,
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
      this.seeSettings = this.boardIds.length === 0;
    },
  },
  methods: {
    setSettings(value) {
      this.seeSettings = value;
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

<style type="text/css" src="./assets/style.css"></style>

