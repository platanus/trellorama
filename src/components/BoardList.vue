<template>
  <div v-if="board !== undefined">
    <div class="dashboard-options__container" v-show="dashboardState !== 'present'">
      <DashboardOptions
        v-bind:board="board"
        @selectLabels="selectLabels"
        @setSettings="setSettings"
        @selectStartDate="selectStartDate"
        @selectEndDate="selectEndDate"
        @selectMembers="selectMembers"
      />
      <transition name="hide-sub-options">
        <DashboardSubOptions
          v-if="dashboardState === 'past' || dashboardState === 'present'"
          v-bind:dashboardState="dashboardState"
          @tab="setTab"
        />
      </transition>
    </div>
    <div class="dashboard-container">
      <Board
        v-if="ready"
        :class="boardClass"
        v-bind:board="board"
        v-bind:selectedLabels="selectedLabels"
        v-bind:startDate="startDate"
        v-bind:endDate="endDate"
        v-bind:tab="tab"
        v-bind:selectedMembers="selectedMembers"
      />
    </div>
  </div>
</template>

<script>
import Board from './Board.vue';
import DashboardOptions from './DashboardOptions.vue';
import DashboardSubOptions from './DashboardSubOptions.vue';
import { get } from '../utils/configurationPersistance.js';

export default {
  name: 'BoardList',
  components: {
    Board,
    DashboardOptions,
    DashboardSubOptions,
  },
  props: {
    board: Object,
  },
  data() {
    return {
      selectedLabels: [],
      startDate: new Date(),
      endDate: new Date(),
      tab: null,
      selectedMembers: [],
    };
  },
  computed: {
    ready() {
      return this.$store.state.ready;
    },
    boardClass() {
      return {
        'dashboard-content': true,
        'dashboard-content--wide': this.dashboardState === 'present',
      };
    },
    dashboardState() {
      return this.$store.state.dashboardState;
    },
  },
  watch: {
    board() {
      this.$store.dispatch('getBoardData', {
        boardId: this.board.id,
        listIds: get(`lists_${this.board.id}`, []),
        archived: get(`archived_${this.$props.board.id}`, []),
      });
    },
  },
  mounted() {
    if (this.board === undefined) return;
    this.$store.dispatch('getBoardData', {
      boardId: this.board.id,
      listIds: get(`lists_${this.board.id}`, []),
      archived: get(`archived_${this.$props.board.id}`, []),
    });
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
    setTab(value) {
      this.tab = value;
    },
    selectMembers(value) {
      this.selectedMembers = value;
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/boardList.scss"></style>
