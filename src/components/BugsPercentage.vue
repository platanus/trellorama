<template>
  <div>
    <p class="dashboard__number">{{ percentage }}%</p>
    <p class="dashboard__text">{{ $t('bug.legend') }}</p>
  </div>
</template>

<script>
import { get } from '../utils/configurationPersistance.js';

const percent = 100;

function emptyArray() {
  return [];
}

export default {
  name: 'BugsPercentage',
  props: {
    cards: {
      type: Array,
      default: emptyArray(),
    },
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
  computed: {
    percentage() {
      if (this.cards.length === 0) return '0';

      return (this.cards.filter((card) =>
        card.labels.map((element) => element.id).some((label) => this.bugLabels.includes(label))
      ).length / this.cards.filter((card) =>
        card.labels.map((element) => element.id).some((label) => !this.bugLabels.includes(label))
      ).length * percent).toFixed(1);
    },
  },
};
</script>
