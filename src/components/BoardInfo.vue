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
        <th>{{ $t('boardInfo.numberOfCards') }}</th>
        <td v-for="list in lists" v-bind:key="list.id + '_count'">{{ cardsByList[list.id].length }}</td>
      </tr>
      <tr>
        <th>{{ $t('boardInfo.timeInListAverage') }}</th>
        <td v-for="list in lists" v-bind:key="list.id + '_time'">
          {{ averageTimeByList[list.id] }}
        </td>
      </tr>
      <tr>
        <th>{{ $t('boardInfo.timeInListStandard') }}</th>
        <td v-for="list in lists" v-bind:key="list.id + '_time'">
          {{ standardDeviationByList[list.id] }}
        </td>
      </tr>
      <tr>
        <th>{{ $t('boardInfo.timeInListMode') }}</th>
        <td v-for="list in lists" v-bind:key="list.id + '_time'">
          {{ modeByList[list.id] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getListCards, getAverageTime, getStandardDeviation, getMode } from '../utils/timeBetweenLists.js';

export default {
  name: 'BoardInfo',
  props: {
    boardId: String,
    listIds: Array,
    lists: Array,
    cardsByList: Object,
    cardActivities: Array,
    endListIds: Array,
    productionListIds: Array,
  },
  data() {
    return {
      averageTimeByList: {},
      standardDeviationByList: {},
      modeByList: {},
    };
  },
  watch: {
    cardActivities() {
      this.lists.forEach((list) => {
        this.$set(
          this.averageTimeByList,
          list.id,
          ((this.endListIds.concat(this.productionListIds).includes(list.id)) ?
            '-' : getAverageTime(...getListCards(this.cardActivities, list.id)))
        );
        this.$set(
          this.standardDeviationByList,
          list.id,
          ((this.endListIds.concat(this.productionListIds).includes(list.id)) ?
            '-' : getStandardDeviation(...getListCards(this.cardActivities, list.id)))
        );
        this.$set(
          this.modeByList,
          list.id,
          ((this.endListIds.concat(this.productionListIds).includes(list.id)) ?
            '-' : getMode(...getListCards(this.cardActivities, list.id)))
        );
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

td,
th {
  border: 1px solid #aaa;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #ddd;
}
</style>
