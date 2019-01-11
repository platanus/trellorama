<template>
  <div class="wizard--board">
    <p class="wizard--text-board">{{ board.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'BoardBox',
  props: {
    board: Object,
  },
};
</script>

<style type="text/css" src="../assets/style.css"></style>

