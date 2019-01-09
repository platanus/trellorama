<template>
  <div>
    <h2>Work In Progress Lists</h2>
    <WIPList
      v-for="list in lists"
      v-bind:key="list.id"
      v-bind:list="list"
      v-bind:cards="cards[list.id]"
      v-bind:WIPLimit="getWip(list.id)"
    />
  </div>
</template>

<script>
import WIPList from './WIPList.vue';

export default {
  name: 'WIPLists',
  props: {
    lists: Array,
    cards: Object,
    wipLimits: Array,
  },
  components: {
    WIPList,
  },
  methods: {
    getWip(listId) {
      const wl = this.wipLimits.find((wipLimit) => wipLimit.id === listId);

      return (wl === undefined ? null : parseInt(wl.wip, 10));
    },
  },
};
</script>
