<template>
  <div>
    <h2>Work In Progress Lists</h2>
    <WIPList
      v-for="list in lists"
      v-bind:key="list.id"
      v-bind:list="list"
      v-bind:cards="cards[list.id]"
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
  },
  components: {
    WIPList,
  },
};
</script>
