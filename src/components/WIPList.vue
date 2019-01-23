<template>
  <div :class="listClass">
    <h3>{{ list.name }} ({{cards.length}}/{{WIPLimit}})</h3>
    <div>
      <Card
        v-for="card in sortedCards"
        v-bind:key="card.id"
        v-bind:card="card"
        v-bind:days="timeInList(card.id).toLocaleString({maximumFractionDigits: 2})"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Card from './Card.vue';

export default {
  name: 'WIPList',
  props: {
    list: Object,
    cards: Array,
    WIPLimit: Number,
    activities: Array,
  },
  components: {
    Card,
  },
  computed: {
    sortedCards() {
      return this.cards.slice().sort((a, b) => this.timeInList(b.id) - this.timeInList(a.id));
    },
    warning() {
      if (this.WIPLimit === null) return false;

      return this.cards.length > this.WIPLimit;
    },
    listClass() {
      return {
        'wip-list--warning': this.warning,
      };
    },
  },
  methods: {
    cardActivities(cardId) {
      return this.activities
        .filter((activity) => activity.data.card.id === cardId);
    },
    timeInList(cardId) {
      const activity = this.cardActivities(cardId).slice()
        .sort((filteredActivity1, filteredActivity2) =>
          moment(filteredActivity2).diff(filteredActivity1, 'seconds', true)
        )[0];

      return activity === undefined ? 0 : moment().diff(activity.date, 'days', true);
    },
  },
};
</script>
