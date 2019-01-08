<template>
  <div :class="classObject">
    <h4>{{ card.name }}</h4>
    <p><b>Date: </b>{{ date }}</p>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Card',
  props: {
    card: Object,
    warning: Boolean,
  },
  computed: {
    date() {
      const date = moment(this.card.dateLastActivity).format('YYYY-MM-DD HH:mm:ss');

      return date.toString();
    },
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
