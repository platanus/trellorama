<template>
  <div :class="classObject">
    <h4>{{ card.name }}</h4>
    <p><b>Days: </b>{{ days }}</p>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    card: Object,
    warning: Boolean,
    days: String,
  },
  computed: {
    classObject() {
      return {
        box: true,
        warning: this.warning,
      };
    },
  },
};
</script>

<style>
.box {
  width: 18%;
  margin: 0.5%;
  border-style: solid;
  border-width: 1px;
  border-color: silver;
  background-color: gainsboro;
}
.warning {
  background-color: salmon;
}
</style>
