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
      };
    },
  },
};
</script>
