<template>
  <div>
    <div class="wip-lists">
      <WIPList
        class="wip-list"
        v-for="list in lists"
        v-bind:key="list.id"
        v-bind:list="list"
        v-bind:cards="cards[list.id] === undefined ? [] : cards[list.id]"
        v-bind:WIPLimit="getWip(list.id)"
        v-bind:activities="listActivities(list.id)"
        v-bind:averageTime="averageTime(list.id)"
      />
    </div>
  </div>
</template>

<script>
import WIPList from './WIPList.vue';
import { getListCards, getAverageTime } from '../utils/timeBetweenLists.js';

export default {
  name: 'WIPLists',
  props: {
    lists: Array,
    cards: Object,
    wipLimits: Array,
    activities: Array,
  },
  components: {
    WIPList,
  },
  methods: {
    getWip(listId) {
      const wl = this.wipLimits.find((wipLimit) => wipLimit.id === listId);

      return (wl === undefined ? null : parseInt(wl.wip, 10));
    },
    listActivities(listId) {
      return this.activities
        .filter((activity) => activity.type === 'updateCard')
        .filter((activity) => activity.data.listAfter.id === listId)
        .concat(
          this.activities
            .filter((activity) => activity.type === 'createCard')
            .filter((activity) => activity.data.list.id === listId)
        );
    },
    averageTime(listId) {
      return parseFloat(getAverageTime(...getListCards(this.activities, listId)));
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/wipLists.scss"></style>
