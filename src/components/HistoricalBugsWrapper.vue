<template>
  <div class="dashboard__single-item-container">
    <h3 class="dashboard__text dashboard__subsection-title">{{ $t('historicalBugs.title') }}</h3>
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
    <HistoricalBugs
      :activities="filteredActivities"
      :dateTypeSelector="dateTypeSelector"
      :dayOfWeek="dayOfWeek"
      :startDate="startDate"
      :backlogListIds="backlogListIds"
    />
  </div>

</template>

<script>
import moment from 'moment';
import { get, save } from '../utils/configurationPersistance.js';
import HistoricalBugs from './HistoricalBugs.vue';

export default {
  name: 'historicalBugsWrapper',
  components: {
    HistoricalBugs,
  },
  props: {
    boardId: String,
    activities: Array,
    cards: Array,
    backlogListIds: Array,
    startDate: Date,
  },
  data() {
    return {
      bugLabels: [],
      dateTypeSelector: get(`${this.boardId}_hist_bug_dateType`, 'day'),
      dayOfWeek: get(`${this.boardId}_hist_bug_dayOfWeek`, 'monday'),
    };
  },
  computed: {
    bugCards() {
      return this.cards.filter((card) =>
        card.labels.map((element) => element.id).some((label) => this.bugLabels.includes(label))
      );
    },
    filteredActivities() {
      return this.activities
        .filter((activity) => this.bugCards.map((card) => card.id).includes(activity.data.card.id));
    },
  },
  watch: {
    dateTypeSelector() {
      save(`${this.boardId}_hist_bug_dateType`, this.dateTypeSelector);
    },
    dayOfWeek() {
      save(`${this.boardId}_hist_bug_dayOfWeek`, this.dayOfWeek);
    },
  },
  mounted() {
    this.bugLabels = get(`bugLabels_${this.boardId}`, []);
  },
};
</script>
