<template>
  <BoardSelector v-bind:boards="boards"/>
</template>

<script>
import BoardSelector from './BoardSelector.vue';

export default {
  name: 'Settings',
  components: {
    BoardSelector,
  },
  props: {
    boards: Array,
  },
};

</script>
