<template>
  <div class="wipLists">
    <p class="dashboard--text dashboard--text-title">Your Board Right Now</p>
    <WIPList
      class="wipList"
      v-for="list in lists"
      v-bind:key="list.id"
      v-bind:list="list"
      v-bind:cards="cards[list.id]"
      v-bind:WIPLimit="getWip(list.id)"
      v-bind:activities="listActivities(list.id)"
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
  },
};
</script>
