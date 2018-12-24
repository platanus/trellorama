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
      </tbody>
  </table>
</template>

<script>
export default {
  name: 'BoardInfo',
  props: {
    boardId: String,
    listIds: Array,
    lists: Array,
    cardsByList: Object,
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
