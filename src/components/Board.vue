<template>
  <div>
    <h1>{{ board.name }}</h1>
    <BoardInfo
        v-bind:lists="lists"
        v-bind:cardsByList="cardsByList"
    />
    <h2>Cumulative Chart</h2>
    <div>
      <b>Options:</b>
      &ensp;
      <label for="fillBackLists">Fill lists retroactively</label>
      <input type="checkbox" id="fillBackLists" v-model="fillBackLists">
      &ensp;
      <label for="dateTypeSelector">Date Format: </label>
      <select id="dateTypeSelector" v-model="dateTypeSelector">
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
      &ensp;
      <select id="dayOfWeek" v-model="dayOfWeek" v-if="dateTypeSelector === 'week'">
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
        <option value="saturday">Saturday</option>
        <option value="sunday">Sunday</option>
      </select>
    </div>
    <StackedChart
      v-bind:activities="cardActivities"
      v-bind:listIds="listIds"
      v-bind:fillBackLists="fillBackLists"
      v-bind:dateTypeSelector="dateTypeSelector"
      v-bind:dayOfWeek="dayOfWeek"
    />
  </div>
</template>

<script>
import BoardInfo from './BoardInfo.vue';
import { request, onRequestError } from '../utils/trelloManager.js';
import StackedChart from './StackedChart.vue';

export default {
  name: 'Board',
  components: {
    BoardInfo,
    StackedChart,
  },
  props: {
    board: Object,
  },
  data() {
    return {
      listIds: [
        '5bcf863f74837934564848c2',
        '5bcf863f74837934564848c3',
        '5bcf863f74837934564848c4',
        '5bcf863f74837934564848c5',
        '5bcf863f74837934564848c6',
        '5bcf863f74837934564848c7',
        '5bcf863f74837934564848c8',
      ],
      lists: [],
      cardsByList: {},
      listIncludesArchived: ['5bcf863f74837934564848c8'],
      cardActivities: [],
      fillBackLists: true,
      dateTypeSelector: 'day',
      dayOfWeek: 'monday',
    };
  },
  mounted() {
    this.getLists(this.$props.board.id, this.listIds);
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
