<template>
  <div id="app" class="app">
    <div v-if="authorized">
      <BoardWizard
        v-if="seeSettings"
        v-bind:boards="boards"
        @setSettings="setSettings"
      />
      <BoardList v-else v-bind:board="selectedBoards[0]" @setSettings="setSettings"/>
    </div>
    <LandingPage v-else/>
  </div>
</template>
<script>
import BoardList from './components/BoardList.vue';
import { isAuthorized } from './utils/trelloManager.js';
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
      boardIds: [],
      selectedBoards: [],
    };
  },
  computed: {
    authorized() {
      return isAuthorized();
    },
    boards() {
      return this.$store.state.boards;
    },
  },
  mounted() {
    if (isAuthorized()) this.$store.dispatch('setBoards');
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
  },
};
</script>

<style lang="scss" src="./assets/styles/app.scss"></style>
<style lang="scss" src="./assets/styles/transitions.scss"></style>
<style lang="scss" src="./assets/styles/buttons.scss"></style>
<style lang="scss" src="./assets/styles/checkbox.scss"></style>
<style lang="scss" src="./assets/styles/dashboardOptions.scss"></style>
<style lang="scss" src="./assets/styles/dashboardSubOptions.scss"></style>
<style lang="scss" src="./assets/styles/dashboardOption.scss"></style>
<style lang="scss" src="./assets/styles/dashboard.scss"></style>
