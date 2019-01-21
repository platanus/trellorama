<template>
  <div>
    <div class="dashboard" v-for="board in boards" v-bind:key="board.id">
      <dashboardOptions
        v-bind:board="board"
        @selectLabels="selectLabels"
        @setSettings="setSettings"
        @selectStartDate="selectStartDate"
        @selectEndDate="selectEndDate"
        @dashboardState="setDashboardState"
      />
      <Board
        class="dashboard-content"
        v-bind:board="board"
        v-bind:selectedLabels="selectedLabels"
        v-bind:startDate="startDate"
        v-bind:endDate="endDate"
        v-bind:dashboardState="dashboardState"
      />
    </div>
  </div>
</template>

<script>
import Board from './Board.vue';
import dashboardOptions from './dashboardOptions.vue';

export default {
  name: 'BoardList',
  components: {
    Board,
    dashboardOptions,
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
  },
};
</script>
