<template>
  <div>
    <p class="dashboard__number">{{ percentage }}%</p>
    <p class="dashboard__text">{{ $t('objectivePercentage.legend') }}</p>
  </div>
</template>

<script>
import { get } from '../utils/configurationPersistance.js';

function emptyArray() {
  return [];
}

const percentageNumber = 100;

export default {
  name: 'objectivePercentage',
  props: {
    cards: {
      type: Array,
      default: emptyArray(),
    },
    boardId: String,
    endListIds: Array,
    productionListIds: Array,
  },
  data() {
    return {
      objectiveLabels: [],
    };
  },
  mounted() {
    this.objectiveLabels = get(`objectiveLabels_${this.boardId}`, []);
  },
  computed: {
    usefulCards() {
      return this.cards.filter((card) => card.idLabels.some((labelId) => this.objectiveLabels.includes(labelId)));
    },
    percentage() {
      return parseInt((this.usefulCards.filter((card) =>
        this.endListIds.concat(this.roductionListIds).includes(card.idList)
      ).length / this.usefulCards.length) * percentageNumber, 10);
    },
  },
};
</script>
