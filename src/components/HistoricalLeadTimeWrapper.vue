<template>
  <div class="dashboard__single-item-container">
    <h3 class="dashboard__text dashboard__subsection-title">{{ $t('dashboard.subOptions.leadTime') }}</h3>
    <div class="dashboard__content-options">
      <b>{{ $t('chart.options') }}:</b>
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
    <HistoricalLeadTime
      class="historical-lead-time"
      v-bind:activities="activities"
      v-bind:endListIds="endListIds"
      v-bind:progressListIds="progressListIds"
      v-bind:backlogListIds="backlogListIds"
      v-bind:productionListIds="productionListIds"
      v-bind:dateTypeSelector="dateTypeSelector"
      v-bind:dayOfWeek="dayOfWeek"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
    />
  </div>
</template>

<script>
import HistoricalLeadTime from './HistoricalLeadTime.vue';
import { get, save } from '../utils/configurationPersistance.js';

export default {
  name: 'historicalLeadTimeWrapper',
  props: {
    activities: Array,
    endListIds: Array,
    startDate: Date,
    endDate: Date,
    progressListIds: Array,
    backlogListIds: Array,
    productionListIds: Array,
  },
  components: {
    HistoricalLeadTime,
  },
  data() {
    return {
      dateTypeSelector: get(`${this.boardId}_hist_lead_dateType`, 'day'),
      dayOfWeek: get(`${this.boardId}_hist_lead_dayOfWeek`, 'monday'),
    };
  },
  watch: {
    dayOfWeek() {
      save(`${this.boardId}_hist_lead_dayOfWeek`, this.dayOfWeek);
    },
    dateTypeSelector() {
      save(`${this.boardId}_hist_lead_dateType`, this.dateTypeSelector);
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/historicalLeadTimeWrapper.scss"></style>
