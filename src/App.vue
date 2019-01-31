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

<style lang="scss" src="./assets/styles/app.scss"></style>
<style lang="scss" src="./assets/styles/buttons.scss"></style>
<style lang="scss" src="./assets/styles/boardWizard.scss"></style>
<style lang="scss" src="./assets/styles/dashboardOption.scss"></style>
<style lang="scss" src="./assets/styles/dashboardOptions.scss"></style>
<style lang="scss" src="./assets/styles/dashboardSubOptions.scss"></style>
<style lang="scss" src="./assets/styles/boardList.scss"></style>
<style lang="scss" src="./assets/styles/board.scss"></style>
<style lang="scss" src="./assets/styles/boardBox.scss"></style>
<style lang="scss" src="./assets/styles/backlogBugs.scss"></style>
<style lang="scss" src="./assets/styles/card.scss"></style>
<style lang="scss" src="./assets/styles/cumulativeWrapper.scss"></style>
<style lang="scss" src="./assets/styles/futureDashboard.scss"></style>
<style lang="scss" src="./assets/styles/historicalBugsWrapper.scss"></style>
<style lang="scss" src="./assets/styles/historicalSpeedWrapper.scss"></style>
<style lang="scss" src="./assets/styles/landingPage.scss"></style>
<style lang="scss" src="./assets/styles/leadTime.scss"></style>
<style lang="scss" src="./assets/styles/leadTimeChart.scss"></style>
<style lang="scss" src="./assets/styles/pastDashboard.scss"></style>
<style lang="scss" src="./assets/styles/presentDashboard.scss"></style>
<style lang="scss" src="./assets/styles/projectionWrapper.scss"></style>
<style lang="scss" src="./assets/styles/teamSpeed.scss"></style>
<style lang="scss" src="./assets/styles/wipHistogramWrapper.scss"></style>
<style lang="scss" src="./assets/styles/wipList.scss"></style>
<style lang="scss" src="./assets/styles/wipLists.scss"></style>
