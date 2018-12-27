<template>
  <div>
    <h1>{{ board.name }}</h1>
    <h2>Tag Filter</h2>
    <v-select multiple v-model="selectedCardLabels" v-bind:options="selectedLabelOptions" />
    <h2>Board Status</h2>
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
      <div class="date-selector">
        <div class="date-selector--input">
          <label for="startDate">Start Date: </label>
          <datepicker v-model="startDate" name="startDate" placeholder="Start Date" format="yyyy-MM-dd"/>
        </div>
        <div class="date-selector--input">
          <label for="endDate">End Date (Not inclusive): </label>
          <datepicker v-model="endDate" name="endDate" placeholder="End Date" format="yyyy-MM-dd"/>
        </div>
      </div>
    </div>
    <CumulativeChart
      v-bind:activities="cardActivities"
      v-bind:listIds="listIds"
      v-bind:fillBackLists="fillBackLists"
      v-bind:dateTypeSelector="dateTypeSelector"
      v-bind:dayOfWeek="dayOfWeek"
    />
    <TeamSpeed v-bind:speed="weeklySpeed(filterActivities(endListId))"/>
  </div>
</template>

<script>
import moment from 'moment';
import vSelect from 'vue-select';
import Datepicker from 'vuejs-datepicker';
import BoardInfo from './BoardInfo.vue';
import { request, onRequestError } from '../utils/trelloManager.js';
import CumulativeChart from './CumulativeChart.vue';
import TeamSpeed from './TeamSpeed';
import getDate from '../utils/getDate.js';

moment().format('yyyy-MM-dd');

export default {
  name: 'Board',
  components: {
    BoardInfo,
    vSelect,
    Datepicker,
    TeamSpeed,
    CumulativeChart,
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
      allCardsByList: {},
      cardsByList: {},
      listIncludesArchived: ['5bcf863f74837934564848c8'],
      allCardsActivities: [],
      cardActivities: [],
      fillBackLists: true,
      dateTypeSelector: 'day',
      dayOfWeek: 'monday',
      selectedLabelOptions: [],
      selectedCardLabels: [],
      startDate: null,
      endDate: null,
      endListId: '5bcf863f74837934564848c8',
    };
  },
  mounted() {
    this.getLists(this.$props.board.id, this.listIds);
    this.getBoardLabels(this.$props.board.id);
    this.getSelectedCards();
  },
  watch: {
    selectedCardLabels() {
      this.getSelectedCards();
      this.getSelectedActivities();
    },
    startDate() {
      this.cardActivities = this.filterActivitiesByDate(this.startDate, true);
    },
    endDate() {
      this.cardActivities = this.filterActivitiesByDate(this.endDate, false);
    },
  },
  methods: {
    filterActivitiesByDate(date, isStartDate) {
      if (isStartDate) {
        return this.cardActivities.filter((activity) => moment(activity.date).isSameOrAfter(date, 'day'));
      }

      return this.cardActivities.filter((activity) => moment(date).isSameOrAfter(activity.date, 'day'));
    },
    getSelectedCards() {
      this.lists.forEach((list) => {
        this.cardsByList[list.id] = this.allCardsByList[list.id].filter(
          (card) => !card.labels.map((label) => label.id).some((cardLabel) => this.selectedCardLabels.map((selectedLabel) => selectedLabel.value).includes(cardLabel)));
      });
    },
    getSelectedActivities() {
      this.cardActivities = this.allCardsActivities.filter(
        (activity) => Object.values(this.cardsByList).flat().map((card) => card.id)
          .includes(activity.data.card.id)
      );
    },
    getLists(boardId, listIds) {
      const self = this;
      request(
        `boards/${boardId}/lists`,
        (response) => {
          self.lists = response.data.filter((element) => listIds.includes(element.id));
          self.lists.forEach((element) => self.getAllCards(element.id, self.listIncludesArchived.includes(element.id)));
        },
        () => {
          onRequestError(self.getLists, [boardId, listIds]);
        }
      );
    },
    getAllCards(listId, includeArchived) {
      const cardsFilter = includeArchived ? 'all' : 'open';
      const self = this;
      self.$set(self.allCardsByList, listId, []);
      self.$set(this.cardsByList, listId, []);
      request(
        `lists/${listId}`,
        (response) => {
          response.data.cards.forEach((card) => {
            self.getAllCardsActivities(card.id);
          });
          self.allCardsByList[listId] = response.data.cards;
          self.cardsByList[listId] = response.data.cards;
        },
        () => {
          onRequestError(self.getAllCards, [listId, includeArchived]);
        },
        { cards: cardsFilter }
      );
    },
    getAllCardsActivities(cardId) {
      const self = this;
      request(
        `cards/${cardId}/actions`,
        (response) => {
          self.allCardsActivities = self.allCardsActivities.concat(response.data);
          self.cardActivities = self.cardActivities.concat(response.data);
        },
        () => {
          onRequestError(self.getAllCardsActivities, [cardId]);
        },
        {
          filter: 'createCard,updateCard:idList',
          since: self.extractDate(self.startDate),
          before: self.extractDate(self.endDate),
        }
      );
    },
    getBoardLabels(boardId) {
      const self = this;
      request(
        `boards/${boardId}/labels`,
        (response) => {
          self.selectedLabelOptions = response.data.map((label) => ({ label: label.name, value: label.id }));
        },
        () => {
          onRequestError(self.getBoardLabels, [boardId]);
        }
      );
    },
    extractDate(date) {
      if (date !== null) {
        return date.toISOString().split('T')[0];
      }

      return null;
    },
    filterActivities(endListId) {
      return this.cardActivities.filter((activity) => activity.type === 'updateCard')
        .filter((activity) => activity.data.listAfter.id === endListId)
        .map((activity) => ({ id: activity.data.card.id, date: getDate(activity.date, 'week') }))
        .sort((card) => card.date);
    },
    weeklySpeed(filteredActivities) {
      return (filteredActivities.length / [...new Set(filteredActivities
        .map((card) => card.date))].length).toFixed(1);
    },
  },
};
</script>

<style>
.date-selector {
  display: flex;
  justify-content: center;
}
.date-selector--input {
  margin: 10px;
  display: flex;
}
</style>
