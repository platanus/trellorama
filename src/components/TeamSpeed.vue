<template>
  <div>
    <h2>Team Speed</h2>
    <p><b>By Week:</b> {{ speed }}</p>
  </div>
</template>
<script>
export default {
  name: 'TeamSpeed',
  props: {
    speed: String,
  },
};

</script>
