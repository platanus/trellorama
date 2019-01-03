<template>
  <div>
    <hr>
    <h1>{{ board.name }}</h1>
    <h2>Label Filter</h2>
    <label for="labelFilterOption">Label Filter Option: </label>
    <select id="labelFilterOption" v-model="labelFilterOptionModel">
      <option value="filter">Filter</option>
      <option value="select">Select</option>
    </select>
    <div v-if="labelFilterOptionModel === 'select'">
      <select id="labelFilterOption" v-model="labelSelect">
        <option
          v-for="labelOption in selectedLabelOptions"
          v-bind:value="labelOption.value"
          v-bind:key="labelOption.value">{{labelOption.label}}</option>
      </select>
    </div>
    <v-select v-if="labelFilterOptionModel === 'filter'" multiple v-model="selectedCardLabels" v-bind:options="selectedLabelOptions" />
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
    />
    <LeadTime v-bind:cardActivities="cardActivities" v-bind:endListId="endListId"/>
    <TeamSpeed v-bind:cardActivities="cardActivities" v-bind:endListId="endListId"/>
    <ProjectionWrapper
        v-bind:cardActivities="cardActivities"
        v-bind:endListId="endListId"
        v-bind:numberOfCards="getNumberOfCards()"
      />
  </div>
</template>

<script>
import vSelect from 'vue-select';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import BoardInfo from './BoardInfo.vue';
import { request, onRequestError } from '../utils/trelloManager.js';
import CumulativeWrapper from './CumulativeWrapper.vue';
import TeamSpeed from './TeamSpeed';
import LeadTime from './LeadTime.vue';
import ProjectionWrapper from './ProjectionWrapper.vue';
import { get } from '../utils/configurationPersistance.js';
import { subtractToDate } from '../utils/dateManager.js';

moment().format('yyyy-MM-dd');

export default {
  name: 'Board',
  components: {
    BoardInfo,
    TeamSpeed,
    CumulativeWrapper,
    vSelect,
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
      selectedLabelOptions: [],
      selectedCardLabels: [],
      endListId: get(`end_${this.$props.board.id}`, null),
      labelFilterOptionModel: 'filter',
      labelSelect: null,
      startDate: subtractToDate(new Date(), 1, 'month', { unit: 'day' }),
      endDate: new Date(),
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
    labelFilterOptionModel() {
      console.log(this.labelFilterOptionModel);
      if (this.labelFilterOptionModel === 'filter') {
        this.selectedCardLabels = [];
        this.getSelectedCards();
      } else {
        this.labelSelect = null;
        this.getFilteredCards();
      }
      this.getSelectedActivities();
    },
    labelSelect() {
      this.getFilteredCards();
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
    getNumberOfCards() {
      return this.lists.map((list) => this.cardsByList[list.id]).flat().length;
    },
    getSelectedCards() {
      this.lists.forEach((list) => {
        this.cardsByList[list.id] = this.allCardsByList[list.id].filter(
          (card) => !card.labels.map((label) => label.id).some((cardLabel) => this.selectedCardLabels.map((selectedLabel) => selectedLabel.value).includes(cardLabel)));
      });
    },
    getFilteredCards() {
      if (this.labelSelect === null) {
        this.cardsByList = this.allCardsByList;

        return;
      }
      this.lists.forEach((list) => {
        this.cardsByList[list.id] = this.allCardsByList[list.id].filter(
          (card) => card.labels.map((label) => label.id).some((cardLabel) => this.labelSelect === cardLabel));
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
    filterActivitiesByDate(date, isStartDate) {
      if (isStartDate) {
        return this.cardActivities.filter((activity) => moment(activity.date).isSameOrAfter(date, 'day'));
      }

      return this.cardActivities.filter((activity) => moment(date).isSameOrAfter(activity.date, 'day'));
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
