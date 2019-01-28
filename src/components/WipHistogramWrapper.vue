<template>
  <div class="dashboard__single-item-container">
    <h3 class="dashboard__text dashboard__subsection-title">{{ $t('wipHistogram.title') }}</h3>
    <div class="dashboard__content-options">
      <b>{{ $t('chart.options') }}:</b>
      &ensp;
      <label for="histListSelector">{{ $t('wipHistogram.selectList') }}: </label>
      <select v-model="selectedList" id="histListSelector">
        <option v-for="list in wipLists" :key="list.id" :value="list.id">{{ list.name }}</option>
      </select>
      <div>
        &ensp;
        <label for="binWidth">{{$t('wipHistogram.binWidth') }}: </label>
        <input type="number" id="binWidth" v-model="binWidth">
      </div>
    </div>
    <WipHistogram
      :binWidth="binWidth"
      :listTimes="listTimes()"
    />
  </div>
</template>

<script>
import WipHistogram from './WipHistogram.vue';
import { getListCards, getTimes } from '../utils/timeBetweenLists.js';

const decimalRoundParameter = 100;

export default {
  name: 'wipHistogramWrapper',
  props: {
    cardActivities: Array,
    wipLists: Array,
  },
  components: {
    WipHistogram,
  },
  data() {
    return {
      selectedList: null,
      binWidth: 1,
    };
  },
  watch: {
    wipLists() {
      if (this.wipLists.length === 0) this.selectedList = null;
      this.selectedList = this.wipLists[0].id;
    },
  },
  mounted() {
    if (this.wipLists.length === 0) this.selectedList = null;
    this.selectedList = this.wipLists[0].id;
    this.binWidth = this.genWidth();
  },
  methods: {
    listActivities(listId) {
      return getListCards(this.cardActivities, listId);
    },
    genWidth() {
      const times = this.listTimes();
      if (times === undefined) return 1;
      const binSize = Math.ceil(Math.sqrt(times.length));

      return Math.round((times[times.length - 1].time - times[0].time) / binSize);
    },
    listTimes() {
      return getTimes(...this.listActivities(this.selectedList), true)
        .map((card) => ({
          time: Math.round(card.time * decimalRoundParameter) / decimalRoundParameter,
          card: card.card,
        })).sort((a, b) => a.time - b.time);
    },
  },
};
</script>
