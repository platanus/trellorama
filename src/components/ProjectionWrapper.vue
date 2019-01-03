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
      &ensp;
      <label for="optimistValue">Optimist increase: </label>
      <input type="number" id="optimistValue" v-model="optimistValue">
      &ensp;
      <label for="pesimistValue">Pesimist decrease: </label>
      <input type="number" id="timeUpesimistValuenits" v-model="pesimistValue">
    </div>
    <ProjectionChart
      v-bind:filteredActivities="filteredActivities"
      v-bind:endListId="endListId"
      v-bind:speed="parseFloat(localSpeedProjection(filteredActivities))"
      v-bind:timeUnitsForward="parseInt(timeUnits)"
      v-bind:dateTypeSelector="dateTypeSelector"
      v-bind:optimistValue="parseInt(optimistValue)"
      v-bind:pesimistValue="parseInt(pesimistValue)"
      v-bind:numberOfCards="numberOfCards"
      v-bind:dayOfWeek="dayOfWeek"
    />
  </div>
</template>

<script>
import ProjectionChart from './ProjectionChart.vue';
import { filterActivities, speedProjection } from '../utils/speedUtil.js';

export default {
  name: 'ProjectionWrapper',
  props: {
    endListId: String,
    cardActivities: Array,
    numberOfCards: Number,
    endDate: String,
    startDate: String,
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
      optimistValue: 1,
      pesimistValue: 1,
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
      return speedProjection(filteredActivities, this.startDate, this.endDate);
    },
    generateData() {
      this.filteredActivities = filterActivities(this.cardActivities, this.endListId, this.dateTypeSelector, this.dayOfWeek);
    },
  },
};

</script>
