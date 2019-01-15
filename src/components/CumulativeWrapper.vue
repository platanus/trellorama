<template>
  <div>
    <h2>Cumulative Chart</h2>
    <div>
      <b>Options:</b>
      &ensp;
      <label for="fillBackLists">Fill lists retroactively</label>
      <input type="checkbox" id="fillBackLists" v-model="fillBackLists">
      &ensp;
      <label for="dateTypeSelector">Date Format: </label>
      <select id="dateTypeSelector" v-model="dateTypeSelector">
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
      &ensp;
      <select id="dayOfWeek" v-model="dayOfWeek" v-if="dateTypeSelector === 'week'">
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
        <option value="saturday">Saturday</option>
        <option value="sunday">Sunday</option>
      </select>
    </div>
    <CumulativeChart
      v-bind:activities="activities"
      v-bind:listIds="listIds"
      v-bind:fillBackLists="fillBackLists"
      v-bind:dateTypeSelector="dateTypeSelector"
      v-bind:dayOfWeek="dayOfWeek"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
    />
  </div>
</template>

<script>
import CumulativeChart from './CumulativeChart.vue';
import { get, save } from '../utils/configurationPersistance.js';

export default {
  name: 'CumulativeWrapper',
  components: {
    CumulativeChart,
  },
  props: {
    cardActivities: Array,
    listIds: Array,
    boardId: String,
    startDate: Date,
    endDate: Date,
  },
  mounted() {
    this.activities = this.cardActivities;
  },
  data() {
    return {
      fillBackLists: get(`${this.boardId}_cumulative_fillBack`, true),
      dateTypeSelector: get(`${this.boardId}_cumulative_dateType`, 'day'),
      dayOfWeek: get(`${this.boardId}_cumulative_dayOfWeek`, 'monday'),
      activities: [],
    };
  },
  watch: {
    cardActivities() {
      this.activities = this.cardActivities;
    },
    dateTypeSelector() {
      save(`${this.boardId}_cumulative_dateType`, this.dateTypeSelector);
    },
    dayOfWeek() {
      save(`${this.boardId}_cumulative_dayOfWeek`, this.dayOfWeek);
    },
    fillBackLists() {
      save(`${this.boardId}_cumulative_fillBack`, this.fillBackLists);
    },
  },
};
</script>
