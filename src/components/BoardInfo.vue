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
    <StackedChart :activities="cardActivities" :listIds="listIds"/>
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
      cardActivities: [],
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
          self.lists.forEach((element) => self.getCards(element.id, self.listIncludesArchived.includes(element.id)));
        },
        (error) => {
          console.log(error);
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
        (error) => {
          console.log(error);
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
        (error) => {
          console.log(error);
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
