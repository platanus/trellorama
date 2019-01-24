<template>
  <div class="dashboard__single-item-container">
    <h3 class="dashboard__text dashboard__subsection-title">{{ $t('historicalBugs.title') }}</h3>
  </div>

</template>

<script>
import { get } from '../utils/configurationPersistance.js';

export default {
  name: 'historicalBugsWrapper',
  components: {
  },
  props: {
    boardId: String,
    activities: Array,
    cards: Array,
  },
  data() {
    return {
      bugLabels: [],
    };
  },
  computed: {
    bugCards() {
      return this.cards.filter((card) =>
        card.labels.map((element) => element.id).some((label) => this.bugLabels.includes(label))
      );
    },
  },
  mounted() {
    this.bugLabels = get(`bugLabels_${this.boardId}`, []);
  },
};
</script>
