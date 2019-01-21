<template>
  <div>
    <hr>
    <h1>{{ board.name }}</h1>
    <h2>{{ $t('board.labelFilter') }}</h2>
    <div class="label-box-conatiner">
      <div v-for="labelOption in labelOptions" class="label-box" v-bind:key="labelOption.value">
        <input type="checkbox" :id="labelOption.value" :value="labelOption.value" v-model="selectedLabels">
        <label :for="labelOption.value">{{labelOption.label}}</label>
      </div>
    </div>
    <h2>{{ $t('board.dateFilter') }}</h2>
    <div class="date-selector">
      <div class="date-selector--input">
        <label for="startDate">{{ $t('board.startDate') }}: </label>
        <datepicker v-model="startDate" name="startDate" placeholder="Start Date" format="yyyy-MM-dd"/>
      </div>
      <div class="date-selector--input">
        <label for="endDate">{{ $t('board.endDate') }}: </label>
        <datepicker v-model="endDate" name="endDate" placeholder="End Date" format="yyyy-MM-dd"/>
      </div>
    </div>
    <h2>{{ $t('board.boardStatus') }}</h2>
    <BoardInfo
        v-bind:lists="lists"
        v-bind:cardsByList="cardsByList"
        v-bind:cardActivities="cardActivities"
        v-bind:endListIds="endListIds"
        v-bind:productionListIds="productionListIds"
    />
    <CumulativeWrapper
      v-bind:cardActivities="cardActivities"
      v-bind:listIds="listIds"
      v-bind:boardId="board.id"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
    />
    <LeadTime
      v-bind:cardActivities="leadMetricsActivities"
      v-bind:endListIds="endListIds"
      v-bind:progressListIds="progressListsIds"
      v-bind:backlogListIds="backlogListIds"
      v-bind:productionListIds="productionListIds"
    />
    <TeamSpeed
      v-bind:cardActivities="cardActivities"
      v-bind:endListIds="endListIds"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
    />
    <ProjectionWrapper
      v-bind:cardActivities="cardActivities"
      v-bind:endListIds="endListIds"
      v-bind:numberOfCards="getNumberOfCards()"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
      v-bind:boardId="board.id"
    />
    <WIPLists
      v-bind:cards="cardsByList"
      v-bind:lists="wipLists"
      v-bind:wipLimits="wipLimits"
      v-bind:activities="allCardsActivities"
    />
    <BugWrapper
      v-bind:cards="endListsCards"
      v-bind:boardId="board.id"
    />
    <wipHistogramWrapper
      v-bind:wipLists="wipLists"
      v-bind:cardActivities="cardActivities"
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
import { subtractToDate } from '../utils/dateManager.js';
import WIPLists from './WIPLists.vue';
import BugWrapper from './BugWrapper.vue';
import wipHistogramWrapper from './wipHistogramWrapper.vue';

const activitiesRequestLimit = 1000;

export default {
  name: 'Board',
  components: {
    BoardInfo,
    TeamSpeed,
    CumulativeWrapper,
    LeadTime,
    ProjectionWrapper,
    Datepicker,
    WIPLists,
    BugWrapper,
    wipHistogramWrapper,
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
      endListIds: get(`end_${this.$props.board.id}`, []),
      labelOptions: [],
      startDate: new Date(get(
        `${this.board.id}_startDate`,
        subtractToDate(new Date(), 1, 'month', { unit: 'day' })
      )),
      endDate: new Date(),
      selectedLabels: [],
      wipListsIds: get(`wip_${this.$props.board.id}`, []),
      wipLimits: get(`wipLimit_${this.$props.board.id}`, []),
      backlogListIds: get(`backlog_${this.$props.board.id}`, []),
      productionListIds: get(`production_${this.$props.board.id}`, []),
      progressListsIds: get(`wip_${this.$props.board.id}`, [null]),
    };
  },
  computed: {
    wipLists() {
      return this.lists.filter((list) => this.wipListsIds.includes(list.id));
    },
    endListsCards() {
      let cards = [];
      this.endListIds.forEach((listId) => {
        cards = cards.concat(this.cardsByList[listId]);
      });
      cards = cards.filter((card) => card !== undefined);

      return cards;
    },
    leadMetricsActivities() {
      const sprintCards = this.progressListsIds.concat(this.productionListIds)
        .concat(this.backlogListIds)
        .concat(this.endListIds)
        .map((listId) => this.cardsByList[listId])
        .flat()
        .filter((card) => card !== undefined)
        .filter((card) => moment(card.dateLastActivity).isSameOrAfter(this.startDate, 'day'))
        .filter((card) => moment(card.dateLastActivity).isSameOrBefore(this.endDate, 'day'))
        .map((card) => card.id);

      return this.allCardsActivities.filter((activity) => sprintCards.includes(activity.data.card.id));
    },
  },
  mounted() {
    this.getLists(this.$props.board.id, this.listIds);
    this.getBoardLabels(this.$props.board.id);
    this.getAllCardsActivities(this.$props.board.id);
  },
  watch: {
    startDate() {
      save(`${this.board.id}_startDate`, this.startDate);
      this.getSelectedActivities();
    },
    endDate() {
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
    allCardsActivities() {
      this.getSelectedActivities();
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
            (this.selectedLabels.includes(null) ? card.labels.length === 0 : false)
        );
      });
    },
    getSelectedActivities() {
      this.cardActivities = this.allCardsActivities.filter(
        (activity) => Object.values(this.cardsByList).flat().map((card) => card.id)
          .includes(activity.data.card.id)
      ).filter((activity) => moment(activity.date).isSameOrAfter(this.startDate, 'day'))
        .filter((activity) => moment(activity.date).isSameOrBefore(this.endDate, 'day'));
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
          self.$set(self.allCardsByList, listId, response.data.cards);
        },
        () => {
          onRequestError(self.getAllCards, [listId, includeArchived]);
        },
        { cards: cardsFilter }
      );
    },
    getAllCardsActivities(boardId, before = null) {
      const self = this;
      request(
        `boards/${boardId}/actions`,
        (response) => {
          self.allCardsActivities = self.allCardsActivities.concat(response.data);
          if (response.data.length === activitiesRequestLimit) {
            self.getAllCardsActivities(boardId, response.data[activitiesRequestLimit - 1].date);
          }
        },
        () => {
          onRequestError(self.getAllCardsActivities, [boardId]);
        },
        {
          filter: 'createCard,updateCard:idList',
          limit: 1000,
          before,
        }
      );
    },
    getBoardLabels(boardId) {
      const self = this;
      request(
        `boards/${boardId}/labels`,
        (response) => {
          self.labelOptions = response.data.map((label) => ({ label: label.name, value: label.id }));
          self.labelOptions.push({ label: 'No Label', value: null });
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
