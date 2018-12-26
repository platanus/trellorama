<template>
  <div>
    <h2>Projection Chart</h2>
    <div>
      <b>Options:</b>
      &ensp;
      <label for="dateTypeSelector">Date Format: </label>
      <select id="dateTypeSelector" v-model="dateTypeSelector">
        <option value="day">Day</option>
        <option value="week">Week</option>
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
      &ensp;
      <label for="timeUnits">Time units to project: </label>
      <input type="number" id="timeUnits" v-model="timeUnits">
    </div>
    <ProjectionChart
      v-bind:filteredActivities="filteredActivities"
      v-bind:endListId="endListId"
      v-bind:speed="parseFloat(speedProjection(filteredActivities))"
      v-bind:timeUnitsForward="parseInt(timeUnits)"
      v-bind:dateTypeSelector="dateTypeSelector"
    />
  </div>
</template>

<script>
import ProjectionChart from './ProjectionChart.vue';
import { getDate } from '../utils/dateManager.js';

export default {
  name: 'ProjectionWrapper',
  props: {
    speed: Number,
    timeUnitsForward: Number,
    endListId: String,
    cardActivities: Array,
  },
  components: {
    ProjectionChart,
  },
  data() {
    return {
      dateTypeSelector: 'week',
      dayOfWeek: 'monday',
      timeUnits: 5,
      filteredActivities: [],
    };
  },
  mounted() {
    this.generateData();
  },
  watch: {
    cardActivities() {
      this.generateData();
    },
    dayOfWeek() {
      this.generateData();
    },
    dateTypeSelector() {
      this.generateData();
    },
  },
  methods: {
    filterActivities(endListId) {
      return this.cardActivities.filter((activity) => activity.type === 'updateCard')
        .filter((activity) => activity.data.listAfter.id === endListId)
        .map((activity) => ({ id: activity.data.card.id, date: getDate(activity.date, this.dateTypeSelector, this.dayOfWeek) }))
        .sort((card) => card.date);
    },
    speedProjection(filteredActivities) {
      return (filteredActivities.length / [...new Set(filteredActivities
        .map((card) => card.date))].length).toFixed(1);
    },
    generateData() {
      this.filteredActivities = this.filterActivities(this.endListId);
    },
  },
};

</script>
