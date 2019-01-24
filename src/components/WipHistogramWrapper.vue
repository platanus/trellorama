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
      &ensp;
      <input type="checkbox" id="genBinSize" v-model="genBinSize">
      <label for="genBinSize">{{$t('wipHistogram.genBin') }}</label>
      <div v-if="!genBinSize">
        &ensp;
        <label for="binWidth">{{$t('wipHistogram.binWidth') }}: </label>
        <input type="number" id="binWidth" v-model="binWidth">
      </div>
    </div>
    <WipHistogram
      v-bind:activities="listActivities(selectedList)"
      :genBinSize="genBinSize"
      :binWidth="binWidth"
    />
  </div>
</template>

<script>
import WipHistogram from './WipHistogram.vue';
import { getListCards } from '../utils/timeBetweenLists.js';

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
      genBinSize: true,
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
  },
  methods: {
    listActivities(listId) {
      return getListCards(this.cardActivities, listId);
    },
  },
};
</script>
