<template>
  <div>
    <h2>Projection Chart</h2>
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
    <ProjectionChart
      v-bind:filteredActivities="filteredActivities"
      v-bind:endListId="endListId"
      v-bind:speed="speed"
      v-bind:timeUnitsForward="5"
    />
  </div>
</template>

<script>
import ProjectionChart from './ProjectionChart.vue';

export default {
  name: 'ProjectionWrapper',
  props: {
    filteredActivities: {
      type: Array,
      default: null,
    },
    speed: Number,
    timeUnitsForward: Number,
    endListId: String,
  },
  components: {
    ProjectionChart,
  },
  data() {
    return {
      dateTypeSelector: 'week',
      dayOfWeek: 'monday',
    };
  },
};

</script>
