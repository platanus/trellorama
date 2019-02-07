<template>
  <div class="dashboard-content__container">
    <div class="dashboard-header">
      <p class="dashboard-header__title">{{ boardName }}</p>
      <BacklogBugs
        v-bind:cards="backlogListCards"
        v-bind:boardId="boardId"
      />
    </div>
    <hr class="dashboard-header__hr">
    <div class="dashboard-header__navigator">
      <button v-on:click="$store.commit('saveDashboardState', 'past')" :class="buttonState('past')">
        <font-awesome-icon icon="long-arrow-alt-left" /> {{ $t('dashboard.options.past') }}
      </button>
      <button v-on:click="$store.commit('saveDashboardState', 'present')" :class="buttonState('present')">
        {{ $t('dashboard.options.present') }}
      </button>
      <button v-on:click="$store.commit('saveDashboardState', 'future')" :class="buttonState('future')">
        {{ $t('dashboard.options.future') }} <font-awesome-icon icon="long-arrow-alt-right" />
      </button>
    </div>
    <div class="dashboard__section">
      <WIPLists
        v-bind:cards="cardsByList"
        v-bind:lists="wipLists"
        v-bind:wipLimits="wipLimits"
        v-bind:activities="allCardsActivities"
      />
    </div>
  </div>
</template>

<script>
import WIPLists from './WIPLists.vue';
import BacklogBugs from './BacklogBugs.vue';

export default {
  name: 'presentDashboard',
  components: {
    WIPLists,
    BacklogBugs,
  },
  props: {
    cardsByList: Object,
    wipLists: Array,
    wipLimits: Array,
    allCardsActivities: Array,
    endListsCards: Array,
    boardId: String,
    backlogListCards: Array,
    boardName: String,
  },
  computed: {
    dashboardState() {
      return this.$store.state.dashboardState;
    },
  },
  methods: {
    buttonState(button) {
      return {
        'dashboard-header__button': true,
        'dashboard-header__button--active': button === this.dashboardState,
      };
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/presentDashboard.scss"></style>
