<template>
  <div>
    <h1>{{ board.name }}</h1>
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
