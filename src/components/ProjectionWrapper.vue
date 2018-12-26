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
      v-bind:speed="parseFloat(localSpeedProjection(filteredActivities))"
      v-bind:timeUnitsForward="parseInt(timeUnits)"
      v-bind:dateTypeSelector="dateTypeSelector"
    />
  </div>
</template>

<script>
import ProjectionChart from './ProjectionChart.vue';
import { filterActivities, speedProjection } from '../utils/speedUtil.js';

export default {
  name: 'ProjectionWrapper',
  props: {
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
    localSpeedProjection(filteredActivities) {
      return speedProjection(filteredActivities);
    },
    generateData() {
      this.filteredActivities = filterActivities(this.cardActivities, this.endListId, this.dateTypeSelector, this.dayOfWeek);
    },
  },
};

</script>
