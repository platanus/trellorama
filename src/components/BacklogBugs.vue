<template>
  <div>
    <p class="dashboard__number">{{ bugs }}</p>
    <p class="dashboard__text">{{ $t('backlogBug.legend') }}</p>
  </div>
</template>

<script>
import { get } from '../utils/configurationPersistance.js';

function emptyArray() {
  return [];
}

export default {
  name: 'backlogBugs',
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
    bugs() {
      if (this.cards.length === 0) return '0';

      return this.cards.filter((card) =>
        card.labels.map((element) => element.id).some((label) => this.bugLabels.includes(label))
      ).length;
    },
  },
};
</script>
