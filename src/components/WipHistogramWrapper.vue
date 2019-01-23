<template>
  <div class="dashboard__single-item-container">
    <p class="dashboard__text dashboard__subsection-title">{{ $t('wipHistogram.title') }}</p>
    <div class="dashboard__content-options">
      <b>{{ $t('chart.options') }}:</b>
      &ensp;
      <label for="histListSelector">{{ $t('wipHistogram.selectList') }}: </label>
      <select v-model="selectedList" id="histListSelector">
        <option v-for="list in wipLists" :key="list.id" :value="list.id">{{ list.name }}</option>
      </select>
    </div>
    <WipHistogram
      v-bind:activities="listActivities(selectedList)"
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
