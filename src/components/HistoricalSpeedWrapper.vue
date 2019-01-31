<template>
  <div class="dashboard__single-item-container">
    <h3 class="dashboard__text dashboard__subsection-title">{{ $t('historicalSpeed.title') }}</h3>
    <div class="dashboard__content-options">
      <b>{{ $t('chart.options') }}:</b>
      &ensp;
      <label for="dateTypeSelector">{{ $t('chart.dateFormat') }}: </label>
      <select id="dateTypeSelector" v-model="dateTypeSelector">
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
    <HistoricalSpeed
      :activities="activities"
      :dateTypeSelector="dateTypeSelector"
      :dayOfWeek="dayOfWeek"
      :startDate="startDate"
      :endDate="endDate"
      :endListIds="endListIds"
    />
  </div>
</template>

<script>
import HistoricalSpeed from './HistoricalSpeed.vue';
import { get, save } from '../utils/configurationPersistance.js';

export default {
  name: 'historicalSpeedWrapper',
  props: {
    boardId: String,
    activities: Array,
    endListIds: Array,
    startDate: Date,
    endDate: Date,
  },
  components: {
    HistoricalSpeed,
  },
  data() {
    return {
      dateTypeSelector: get(`${this.boardId}_hist_speed_dateType`, 'day'),
      dayOfWeek: get(`${this.boardId}_hist_speed_dayOfWeek`, 'monday'),
    };
  },
  watch: {
    dayOfWeek() {
      save(`${this.boardId}_hist_speed_dayOfWeek`, this.dayOfWeek);
    },
    dateTypeSelector() {
      save(`${this.boardId}_hist_speed_dateType`, this.dateTypeSelector);
    },
  },
};
</script>
