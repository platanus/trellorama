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
      v-bind:startDate="startDate"
    />
  </div>
</template>

<script>
import ProjectionChart from './ProjectionChart.vue';
import { filterActivities, speedProjection } from '../utils/speedUtil.js';
import { get, save } from '../utils/configurationPersistance.js';

const baseProjectionTimeUnits = 5;

export default {
  name: 'ProjectionWrapper',
  props: {
    endListId: String,
    cardActivities: Array,
    numberOfCards: Number,
    endDate: Date,
    boardId: String,
    startDate: Date,
  },
  components: {
    ProjectionChart,
  },
  data() {
    return {
      dateTypeSelector: get(`${this.boardId}_projection_dateType`, 'week'),
      dayOfWeek: get(`${this.boardId}_projection_dayOfWeek`, 'monday'),
      timeUnits: get(`${this.boardId}_projection_timeUnits`, baseProjectionTimeUnits),
      filteredActivities: [],
      optimistValue: get(`${this.boardId}_projection_optimistValue`, 1),
      pesimistValue: get(`${this.boardId}_projection_pesimistValue`, 1),
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
      save(`${this.boardId}_projection_dayOfWeek`, this.dayOfWeek);
      this.generateData();
    },
    dateTypeSelector() {
      save(`${this.boardId}_projection_dateType`, this.dateTypeSelector);
      this.generateData();
    },
    timeUnits() {
      save(`${this.boardId}_projection_timeUnits`, this.timeUnits);
    },
    optimistValue() {
      save(`${this.boardId}_projection_optimistValue`, this.optimistValue);
    },
    pesimistValue() {
      save(`${this.boardId}_projection_pesimistValue`, this.pesimistValue);
    },
  },
  methods: {
    localSpeedProjection(filteredActivities) {
      return speedProjection(filteredActivities, this.startDate, this.endDate);
    },
    generateData() {
      this.filteredActivities = filterActivities(
        this.cardActivities,
        this.endListId,
        this.dateTypeSelector,
        this.dayOfWeek
      );
    },
  },
};

</script>
