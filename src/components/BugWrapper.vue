<template>
  <div>
    <h2>{{ $t('bugWrapper.finishedCards') }}</h2>
    <BugChart
      v-bind:cards="cards"
      v-bind:bugLabels="bugLabels"
    />
  </div>
</template>

<script>
import BugChart from './BugChart.vue';
import { get } from '../utils/configurationPersistance.js';

export default {
  name: 'BugWrapper',
  components: {
    BugChart,
  },
  props: {
    cards: Array,
    boardId: String,
  },
  data() {
    return {
      bugLabels: [],
    };
  },
  mounted() {
    this.bugLabels = get(`bugLabels_${this.boardId}`, []);
  },
};
</script>
