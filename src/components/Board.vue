<template>
  <div>
    <hr>
    <h1>{{ board.name }}</h1>
    <h2>Label Filter</h2>
    <div class="label-box-conatiner">
      <div v-for="labelOption in labelOptions" class="label-box" v-bind:key="labelOption.value">
        <input type="checkbox" :id="labelOption.value" :value="labelOption.value" v-model="selectedLabels">
        <label :for="labelOption.value">{{labelOption.label}}</label>
      </div>
    </div>
    <h2>Date Filter</h2>
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
    <h2>Board Status</h2>
    <BoardInfo
        v-bind:lists="lists"
        v-bind:cardsByList="cardsByList"
        v-bind:cardActivities="cardActivities"
        v-bind:endListId="endListId"
    />
    <CumulativeWrapper
      v-bind:cardActivities="cardActivities"
      v-bind:listIds="listIds"
      v-bind:boardId="board.id"
      v-bind:startDate="startDate"
    />
    <LeadTime v-bind:cardActivities="cardActivities" v-bind:endListId="endListId"/>
    <TeamSpeed
      v-bind:cardActivities="cardActivities"
      v-bind:endListId="endListId"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
    />
    <ProjectionWrapper
      v-bind:cardActivities="cardActivities"
      v-bind:endListId="endListId"
      v-bind:numberOfCards="getNumberOfCards()"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
      v-bind:boardId="board.id"
    />
  </div>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import BoardInfo from './BoardInfo.vue';
import { request, onRequestError } from '../utils/trelloManager.js';
import CumulativeWrapper from './CumulativeWrapper.vue';
import TeamSpeed from './TeamSpeed';
import LeadTime from './LeadTime.vue';
import ProjectionWrapper from './ProjectionWrapper.vue';
import { get, save } from '../utils/configurationPersistance.js';
import { subtractToDate, getDate } from '../utils/dateManager.js';

moment().format('yyyy-MM-dd');

export default {
  name: 'Board',
  components: {
    BoardInfo,
    TeamSpeed,
    CumulativeWrapper,
    LeadTime,
    ProjectionWrapper,
    Datepicker,
  },
  props: {
    board: Object,
  },
  data() {
    return {
      listIds: get(`lists_${this.$props.board.id}`, []),
      lists: [],
      allCardsByList: {},
      cardsByList: {},
      listIncludesArchived: get(`archived_${this.$props.board.id}`, []),
      allCardsActivities: [],
      cardActivities: [],
      endListId: get(`end_${this.$props.board.id}`, null),
      labelOptions: [],
      startDate: new Date(get(
        `${this.board.id}_startDate`,
        subtractToDate(new Date(), 1, 'month', { unit: 'day' })
      )),
      endDate: new Date(),
      selectedLabels: [],
    };
  },
  mounted() {
    this.getLists(this.$props.board.id, this.listIds);
    this.getBoardLabels(this.$props.board.id);
  },
  watch: {
    startDate() {
      save(`${this.board.id}_startDate`, this.startDate);
      this.allCardsActivities = [];
      Object.values(this.cardsByList).flat().forEach((card) => this.getAllCardsActivities(card.id));
    },
    endDate() {
      this.allCardsActivities = [];
      Object.values(this.cardsByList).flat().forEach((card) => this.getAllCardsActivities(card.id));
    },
    allCardsActivities() {
      this.getSelectedActivities();
    },
    selectedLabels() {
      save(`${this.board.id}_selectedLabels`, this.selectedLabels);
      this.getSelectedCards();
      this.getSelectedActivities();
    },
    allCardsByList: {
      handler() {
        this.getSelectedCards();
        this.getSelectedActivities();
      },
      deep: true,
    },
  },
  methods: {
    getNumberOfCards() {
      return this.lists.map((list) => this.cardsByList[list.id]).flat().length;
    },
    getSelectedCards() {
      this.lists.forEach((list) => {
        this.cardsByList[list.id] = this.allCardsByList[list.id].filter(
          (card) =>
            card.labels.map((label) => label.id).some((cardLabel) => this.selectedLabels.includes(cardLabel)) ||
            card.labels.length === 0
        );
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
          self.$set(self.allCardsByList, listId, response.data.cards);
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
          since: getDate(self.startDate, 'day'),
          before: getDate(self.endDate, 'day'),
        }
      );
    },
    getBoardLabels(boardId) {
      const self = this;
      request(
        `boards/${boardId}/labels`,
        (response) => {
          self.labelOptions = response.data.map((label) => ({ label: label.name, value: label.id }));
          self.selectedLabels = get(`${this.board.id}_selectedLabels`, null);
          if (self.selectedLabels === null) self.selectedLabels = self.labelOptions.map((label) => label.value);
        },
        () => {
          onRequestError(self.getBoardLabels, [boardId]);
        }
      );
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
.label-box-conatiner {
  display: flex;
  flex-wrap: wrap;
}
.label-box {
  display: flex;
  margin: 10px;
}
</style>
