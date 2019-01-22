<template>
  <div>
    <h1>{{ board.name }}</h1>
    <presentDashboard
      v-if="dashboardState === 'present'"
      :endListIds="endListIds"
      :progressListsIds="progressListsIds"
      :backlogListIds="backlogListIds"
      :productionListIds="productionListIds"
      :leadMetricsActivities="leadMetricsActivities"
      :cardActivities="cardActivities"
      :startDate="startDate"
      :endDate="endDate"
      :cardsByList="cardsByList"
      :wipLists="wipLists"
      :wipLimits="wipLimits"
      :allCardsActivities="allCardsActivities"
      :endListsCards="endListsCards"
      :boardId="board.id"
    />
  </div>
</template>

<script>
import moment from 'moment';
import { request, onRequestError } from '../utils/trelloManager.js';
import { get, save } from '../utils/configurationPersistance.js';
import presentDashboard from './presentDashboard.vue';

const activitiesRequestLimit = 1000;

export default {
  name: 'Board',
  components: {
    presentDashboard,
  },
  props: {
    board: Object,
    selectedLabels: Array,
    startDate: Date,
    endDate: Date,
    dashboardState: String,
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
  },
};
</script>

<style>
.date-selector {
  display: flex;
  justify-content: center;
}
</style>
