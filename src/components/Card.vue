<template>
  <div class="box">
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
  },
  computed: {
    date() {
      const date = moment(this.card.dateLastActivity).format('YYYY-MM-DD HH:mm:ss');

      return date.toString();
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
</style>
