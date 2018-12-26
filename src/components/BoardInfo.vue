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
        <th>Time in List</th>
        <td v-for="list in lists" v-bind:key="list.id + '_time'">
          <b>Days: </b> {{ averageTimeByList[list.id][0] }}
          <b>Hours: </b> {{ averageTimeByList[list.id][1] }}
          <b>Minutes: </b> {{ averageTimeByList[list.id][2] }}
          <b>Seconds: </b> {{ averageTimeByList[list.id][3] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import timeBetweenLists from '../utils/timeBetweenLists.js';

export default {
  name: 'BoardInfo',
  props: {
    boardId: String,
    listIds: Array,
    lists: Array,
    cardsByList: Object,
    cardActivities: Array,
  },
  data() {
    return {
      averageTimeByList: {},
    };
  },
  watch: {
    cardActivities() {
      this.lists.forEach((list) => {
        this.$set(this.averageTimeByList, list.id, timeBetweenLists(this.cardActivities, list.id, false));
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
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
