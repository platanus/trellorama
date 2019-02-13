<template>
  <div class="dashboard__single-item-container">
    <h3 class="dashboard__text dashboard__subsection-title">Projection Chart</h3>
    <div class="dashboard__content-options">
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
      &ensp;
      <b>Priorities:</b>
      <div v-for="option in goals">
        <label>{{ option.label.label }} </label>
        <input type="number" id="option.label.value" v-model="priorities[option.label.value]">
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
      v-bind:goals="goals"
    />
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import ProjectionChart from './ProjectionChart.vue';
import { filterActivities, speedProjection, excludeActivities } from '../utils/speedUtil.js';
import { get, save } from '../utils/configurationPersistance.js';

const sortValue = 1;

export default {
  name: 'ProjectionWrapper',
  props: {
    endListIds: Array,
    cardActivities: Array,
    numberOfCards: Number,
    endDate: Date,
    boardId: String,
    startDate: Date,
    productionListIds: Array,
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
      priorities: {},
      goals: [],
    };
  },
  computed: {
    timeUnits() {
      return Math.ceil(moment(this.projectionDate).diff(moment(new Date()), `${this.dateTypeSelector}s`, true));
    },
    cards() {
      return Object.values(this.$store.state.allCardsByList).flat();
    },
    excludedLists() {
      return this.$store.state.lists.map((list) => list.id)
        .filter((list) => !this.endListIds.includes(list))
        .filter((list) => !this.productionListIds.includes(list));
    },
    allLabels() {
      return this.$store.state.labels;
    },
  },
  mounted() {
    this.generateData();
    this.generateGoals();
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
    priorities: {
      handler() {
        this.updateGoals();
      },
      deep: true,
    },
  },
  methods: {
    localSpeedProjection(filteredActivities) {
      return speedProjection(filteredActivities, this.startDate, this.endDate);
    },
    generateData() {
      this.filteredActivities = excludeActivities(
        this.cards,
        filterActivities(
          this.cardActivities,
          this.endListIds,
          this.dateTypeSelector,
          this.dayOfWeek
        ),
        this.excludedLists
      );
    },
    usefulCards(labelId) {
      return this.cards.filter((card) => card.idLabels.some((label) => label === labelId));
    },
    generateGoals() {
      const labels = get(`objectiveLabels_${this.boardId}`, []);
      let objectiveLabels = this.allLabels.filter((label) => labels.includes(label.value));
      objectiveLabels = objectiveLabels.sort((a, b) => {
        if (a.label.toLowerCase() < b.label.toLowerCase()) return -sortValue;
        if (a.label.toLowerCase() > b.label.toLowerCase()) return sortValue;

        return 0;
      });

      this.goals = objectiveLabels.map((label) => ({ label, count: this.leftForGoal(label.value), padding: 0 }))
        .filter((goal) => goal.count > 0);
      let priority = 1;
      this.goals.forEach((goal) => {
        this.$set(this.priorities, goal.label.value, priority);
        priority++;
      });
      this.updateGoals();
    },
    leftForGoal(labelId) {
      const usefulCards = this.usefulCards(labelId);
      if (usefulCards.length === 0) return 0;

      return usefulCards.length - usefulCards.filter((card) =>
        this.endListIds.concat(this.productionListIds).includes(card.idList)
      ).length;
    },
    updateGoals() {
      const goals = this.goals.slice().sort((a, b) =>
        parseInt(this.priorities[a.label.value], 10) - parseInt(this.priorities[b.label.value], 10)
      );
      goals.forEach((goal, index) => {
        if (index === 0) return;
        const prevGoal = goals[index - 1];
        this.goals.find((realGoal) => realGoal.label === goal.label).padding = prevGoal.count + prevGoal.padding;
      });
    },
  },
};

</script>
