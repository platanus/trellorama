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
      <label for="optimistValue">Optimist increase: </label>
      <input type="number" id="optimistValue" v-model="optimistValue">
      &ensp;
      <label for="pesimistValue">Pesimist decrease: </label>
      <input type="number" id="timeUpesimistValuenits" v-model="pesimistValue">
      &ensp;
      <div class="date-selector">
        <div class="date-selector--input">
          <label for="endDate">Projection Date: </label>
          <datepicker v-model="projectionDate" name="projectionDate" placeholder="Projection Date" format="yyyy-MM-dd"/>
        </div>
      </div>
    </div>
    <ProjectionChart
      v-bind:filteredActivities="filteredActivities"
      v-bind:speed="parseFloat(localSpeedProjection(filteredActivities))"
      v-bind:timeUnitsForward="timeUnits"
      v-bind:dateTypeSelector="dateTypeSelector"
      v-bind:optimistValue="parseInt(optimistValue)"
      v-bind:pesimistValue="parseInt(pesimistValue)"
      v-bind:numberOfCards="numberOfCards"
      v-bind:dayOfWeek="dayOfWeek"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
    />
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import ProjectionChart from './ProjectionChart.vue';
import { filterActivities, speedProjection } from '../utils/speedUtil.js';
import { get, save } from '../utils/configurationPersistance.js';

moment().format('yyyy-MM-dd');

export default {
  name: 'ProjectionWrapper',
  props: {
    endListIds: Array,
    cardActivities: Array,
    numberOfCards: Number,
    endDate: Date,
    boardId: String,
    startDate: Date,
  },
  components: {
    ProjectionChart,
    Datepicker,
  },
  data() {
    return {
      dateTypeSelector: get(`${this.boardId}_projection_dateType`, 'week'),
      dayOfWeek: get(`${this.boardId}_projection_dayOfWeek`, 'monday'),
      filteredActivities: [],
      optimistValue: get(`${this.boardId}_projection_optimistValue`, 1),
      pesimistValue: get(`${this.boardId}_projection_pesimistValue`, 1),
      projectionDate: get(`${this.boardId}_projection_projectionDate`, new Date()),
    };
  },
  computed: {
    timeUnits() {
      return Math.ceil(moment(this.projectionDate).diff(moment(new Date()), `${this.dateTypeSelector}s`, true));
    },
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
    projectionDate() {
      save(`${this.boardId}_projection_projectionDate`, this.projectionDate);
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
        this.endListIds,
        this.dateTypeSelector,
        this.dayOfWeek
      );
    },
  },
};

</script>

<style>
.date-selector {
  display: flex;
  justify-content: center;
}
.date-selector--input {
  margin: 10px;
  display: flex;
}
</style>

