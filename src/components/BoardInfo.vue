<template>
  <div>
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
    <h2>Cumulative Chart</h2>
    <div>
      <b>Options:</b>
      &ensp;
      <label for="fillBackLists">Fill lists retroactively</label>
      <input type="checkbox" id="fillBackLists" v-model="fillBackLists">
    </div>
    <StackedChart :activities="cardActivities" :listIds="listIds" :fillBackLists="fillBackLists"/>
  </div>
</template>

<script>
import { request, onRequestError } from '../utils/trelloManager.js';
import StackedChart from './StackedChart.vue';

export default {
  name: 'BoardInfo',
  components: {
    StackedChart,
  },
  data() {
    return {
      lists: [],
      cardsByList: {},
      listIncludesArchived: ['5bcf863f74837934564848c8'],
      cardActivities: [],
      fillBackLists: true,
    };
  },
  props: {
    boardId: String,
    listIds: Array,
  },
  mounted() {
    this.getLists(this.$props.boardId, this.$props.listIds);
  },
  methods: {
    getLists(boardId, listIds) {
      const self = this;
      request(
        `boards/${boardId}/lists`,
        (response) => {
          self.lists = response.data.filter((element) => listIds.includes(element.id));
          self.lists.forEach((element) => self.getCards(element.id, self.listIncludesArchived.includes(element.id)));
        },
        () => {
          onRequestError(self.getLists, [boardId, listIds]);
        }
      );
    },
    getCards(listId, includeArchived) {
      const cardsFilter = includeArchived ? 'all' : 'open';
      const self = this;
      self.$set(self.cardsByList, listId, []);
      request(
        `lists/${listId}`,
        (response) => {
          response.data.cards.forEach((card) => self.getCardActivities(card.id));
          self.cardsByList[listId] = response.data.cards;
        },
        () => {
          onRequestError(self.getCards, [listId, includeArchived]);
        },
        { cards: cardsFilter }
      );
    },
    getCardActivities(cardId) {
      const self = this;
      request(
        `cards/${cardId}/actions`,
        (response) => { self.cardActivities = self.cardActivities.concat(response.data); },
        () => {
          onRequestError(self.getCardActivities, [cardId]);
        },
        { filter: 'createCard,updateCard:idList' }
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
