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
      <div class="date-selector">
        <div class="date-selector--input">
          <label for="startDate">Start Date: </label>
          <datepicker v-model="startDate" name="startDate" placeholder="Start Date" format="yyyy-MM-dd"/>
        </div>
        <div class="date-selector--input">
          <label for="endDate">End Date (Not inclusive): </label>
          <datepicker v-model="endDate" name="endDate" placeholder="End Date" format="yyyy-MM-dd"/>
        </div>
      </div>
    </div>
    <CumulativeChart
      v-bind:activities="activities"
      v-bind:listIds="listIds"
      v-bind:fillBackLists="fillBackLists"
      v-bind:dateTypeSelector="dateTypeSelector"
      v-bind:dayOfWeek="dayOfWeek"
    />
  </div>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import CumulativeChart from './CumulativeChart.vue';

moment().format('yyyy-MM-dd');

export default {
  name: 'CumulativeWrapper',
  components: {
    CumulativeChart,
    Datepicker,
  },
  props: {
    cardActivities: Array,
    listIds: Array,
  },
  mounted() {
    this.activities = this.cardActivities;
  },
  data() {
    return {
      fillBackLists: true,
      dateTypeSelector: 'day',
      dayOfWeek: 'monday',
      startDate: null,
      endDate: null,
      activities: [],
    };
  },
  watch: {
    cardActivities() {
      this.activities = this.cardActivities;
    },
    startDate() {
      this.activities = this.filterActivitiesByDate(this.startDate, true);
    },
    endDate() {
      this.activities = this.filterActivitiesByDate(this.endDate, false);
    },
  },
  methods: {
    filterActivitiesByDate(date, isStartDate) {
      if (isStartDate) {
        return this.cardActivities.filter((activity) => moment(activity.date).isSameOrAfter(date, 'day'));
      }

      return this.cardActivities.filter((activity) => moment(date).isSameOrAfter(activity.date, 'day'));
    },
  },
};
</script>
