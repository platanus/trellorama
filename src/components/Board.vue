<template>
  <div>
    <h2>{{ board.name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    board: Object,
  },
};
</script>
