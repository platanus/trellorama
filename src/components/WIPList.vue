<template>
  <div>
    <h3>{{ list.name }} ({{cards.length}}/{{WIPLimit}})</h3>
    <div class="container">
      <Card
        v-for="card in sortedCards"
        v-bind:key="card.id"
        v-bind:card="card"
        v-bind:warning="warning"
        v-bind:activities="cardActivities(card.id)"
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
      return this.cards.slice().sort((a, b) => moment(a.dateLastActivity) - moment(b.dateLastActivity));
    },
    warning() {
      if (this.WIPLimit === null) return false;

      return this.cards.length > this.WIPLimit;
    },
  },
  methods: {
    cardActivities(cardId) {
      return this.activities
        .filter((activity) => activity.data.card.id === cardId);
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
