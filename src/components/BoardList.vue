<template>
  <div>
    <div v-for="board in boards" v-bind:key="board.id" style="position: relative;">
      <DashboardOptions
        v-bind:board="board"
        @selectLabels="selectLabels"
        @setSettings="setSettings"
        @selectStartDate="selectStartDate"
        @selectEndDate="selectEndDate"
        @dashboardState="setDashboardState"
      />
      <DashboardSubOptions
        v-if="dashboardState === 'past'"
        v-bind:dashboardState="dashboardState"
        @tab="setTab"
      />
      <Board
        class="dashboard-content"
        v-bind:board="board"
        v-bind:selectedLabels="selectedLabels"
        v-bind:startDate="startDate"
        v-bind:endDate="endDate"
        v-bind:dashboardState="dashboardState"
        v-bind:tab="tab"
      />
    </div>
  </div>
</template>

<script>
import Board from './Board.vue';
import DashboardOptions from './DashboardOptions.vue';
import DashboardSubOptions from './DashboardSubOptions.vue';

export default {
  name: 'BoardList',
  components: {
    Board,
    DashboardOptions,
    DashboardSubOptions,
  },
  props: {
    boards: Array,
  },
  data() {
    return {
      selectedLabels: [],
      startDate: new Date(),
      endDate: new Date(),
      dashboardState: 'present',
      tab: null,
    };
  },
  methods: {
    setSettings() {
      this.$emit('setSettings', true);
    },
    selectLabels(value) {
      this.selectedLabels = value;
    },
    selectStartDate(value) {
      this.startDate = value;
    },
    selectEndDate(value) {
      this.endDate = value;
    },
    setDashboardState(value) {
      this.dashboardState = value;
    },
    setTab(value) {
      this.tab = value;
    },
  },
};
</script>
