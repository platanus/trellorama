<template>
  <div :class="classObject">
    <h4>{{ card.name }}</h4>
    <p><b>{{ $t('wip.days') }}: </b>{{ days }}</p>
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
  width: 100%;
  margin: 1%;
  border-style: solid;
  border-width: 1px;
  border-color: #c0c0c0;
  background-color: #eaeaea;
  border-radius: 5px;
}

.warning {
  background-color: #fa8072;
}
</style>
