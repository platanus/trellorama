<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th v-for="list in lists" v-bind:key="list.id">{{list.name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Number of Cards</th>
                <td v-for="list in lists" v-bind:key="list.id + '_count'">{{ cardCountByList[list.id].length }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { request, onRequestError } from '../trelloManager.js';

export default {
  name: 'BoardInfo',
  data() {
    return {
      lists: [],
      cardCountByList: {},
      listIds: [
        '5bcf863f74837934564848c2',
        '5bcf863f74837934564848c3',
        '5bcf863f74837934564848c4',
        '5bcf863f74837934564848c5',
        '5bcf863f74837934564848c6',
        '5bcf863f74837934564848c7',
        '5bcf863f74837934564848c8',
      ],
      listIncludesArchived: ['5bcf863f74837934564848c8'],
    };
  },
  props: {
    boardId: String,
  },
  mounted() {
    this.getLists(this.$props.boardId, this.listIds);
  },
  methods: {
    getLists(boardId, listIds) {
      const self = this;
      request(
        `boards/${boardId}/lists`,
        (response) => {
          self.lists = response.data.filter((element) => listIds.includes(element.id));
          self.lists.forEach((element) => self.countCards(element.id, self.listIncludesArchived.includes(element.id)));
        },
        (error) => {
          console.log(error);
          onRequestError(self.getLists, [boardId, listIds]);
        }
      );
    },
    countCards(listId, includeArchived) {
      const cardsFilter = includeArchived ? 'all' : 'open';
      const self = this;
      self.$set(self.cardCountByList, listId, []);
      request(
        `lists/${listId}`,
        (response) => { self.cardCountByList[listId] = response.data.cards; },
        (error) => {
          console.log(error);
          onRequestError(self.countCards, [listId, includeArchived]);
        },
        { cards: cardsFilter }
      );
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
