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
    endListIds: Array,
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
      return this.filterDuplicates(this.activities
        .filter((activity) => this.bugCards.map((card) => card.id).includes(activity.data.card.id))
        .filter((activity) => activity.type === 'updateCard')
        .filter((activity) => this.endListIds.includes(activity.data.listAfter.id)))
        .sort((act1, act2) => moment(act1) - moment(act2));
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
  methods: {
    filterDuplicates(activities) {
      return activities
        .filter((activity) =>
          activities.filter((filteredActivity) => filteredActivity.data.card.id === activity.data.card.id).length === 1
        ).concat(Object.values(
          activities.filter((activity) =>
            activities.filter((filteredActivity) => filteredActivity.data.card.id === activity.data.card.id).length > 1
          ).reduce((acc, cur) => Object.assign(acc, { [cur.data.card.id]: cur }), {}))
        );
    },
  },
};
</script>
