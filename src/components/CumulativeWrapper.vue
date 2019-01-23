<template>
  <div>
    <p class="dashboard__text dashboard__text-title">{{ $t('cumulative.title') }}</p>
    <div>
      <b>{{ $t('chart.options') }}:</b>
      &ensp;
      <label for="fillBackLists">{{ $t('cumulative.fill') }}</label>
      <input type="checkbox" id="fillBackLists" v-model="fillBackLists">
      &ensp;
      <label for="dateTypeSelector">{{ $t('chart.dateFormat') }}: </label>
      <select id="dateTypeSelector" v-model="dateTypeSelector">
        <option value="day">{{ $t('date.day') }}</option>
        <option value="week">{{ $t('date.week') }}</option>
        <option value="month">{{ $t('date.month') }}</option>
      </select>
      &ensp;
      <select id="dayOfWeek" v-model="dayOfWeek" v-if="dateTypeSelector === 'week'">
        <option value="monday">{{ $t('date.monday') }}</option>
        <option value="tuesday">{{ $t('date.tuesday') }}</option>
        <option value="wednesday">{{ $t('date.wednesday') }}</option>
        <option value="thursday">{{ $t('date.thursday') }}</option>
        <option value="friday">{{ $t('date.friday') }}</option>
        <option value="saturday">{{ $t('date.saturday') }}</option>
        <option value="sunday">{{ $t('date.sunday') }}</option>
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
