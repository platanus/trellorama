<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="list in lists" v-bind:key="list.id">{{ list.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Number of Cards</th>
        <td v-for="list in lists" v-bind:key="list.id + '_count'">{{ cardsByList[list.id].length }}</td>
      </tr>
      <tr>
        <th>Time in List Average (days)</th>
        <td v-for="list in lists" v-bind:key="list.id + '_time'">
          {{ averageTimeByList[list.id] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getListCards, getAverageTime } from '../utils/timeBetweenLists.js';

export default {
  name: 'BoardInfo',
  props: {
    boardId: String,
    listIds: Array,
    lists: Array,
    cardsByList: Object,
    cardActivities: Array,
    endListId: String,
  },
  data() {
    return {
      averageTimeByList: {},
    };
  },
  watch: {
    cardActivities() {
      this.lists.forEach((list) => {
        this.$set(this.averageTimeByList, list.id, ((list.id === this.endListId) ? '-' : getAverageTime(...getListCards(this.cardActivities, list.id))));
      });
    },
  },
};

</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #aaaaaa;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
