<template>
  <div>
    <h1 class="dashboard__board-title">{{ board.name }}</h1>
    <transition name="toggle" mode="out-in" appear>
      <PresentDashboard
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
        :tab="tab"
        :backlogListCards="backlogListCards"
      />
      <PastDashboard
        v-if="dashboardState === 'past'"
        :cardActivities="cardActivities"
        :startDate="startDate"
        :endDate="endDate"
        :boardId="board.id"
        :wipLists="wipLists"
        :listIds="listIds"
        :tab="tab"
        :allListCards="allListCards"
        :endListIds="endListIds"
        :backlogListIds="backlogListIds"
        :leadMetricsActivities="leadMetricsActivities"
        :progressListsIds="progressListsIds"
        :productionListIds="productionListIds"
        :allCardsActivities="allCardsActivities"
      />
      <FutureDashboard
        v-if="dashboardState === 'future'"
        :endListIds="endListIds"
        :cardActivities="allCardsActivities"
        :startDate="startDate"
        :endDate="endDate"
        :boardId="board.id"
        :numberOfCards="getNumberOfCards()"
        :productionListIds="productionListIds"
        :cardsByList="cardsByList"
      />
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import { get, save } from '../utils/configurationPersistance.js';
import PresentDashboard from './PresentDashboard.vue';
import PastDashboard from './PastDashboard.vue';
import FutureDashboard from './FutureDashboard.vue';

export default {
  name: 'Board',
  components: {
    PresentDashboard,
    PastDashboard,
    FutureDashboard,
  },
  props: {
    board: Object,
    selectedLabels: Array,
    startDate: Date,
    endDate: Date,
    dashboardState: String,
    tab: String,
    selectedMembers: Array,
  },
  data() {
    return {
      listIds: get(`lists_${this.$props.board.id}`, []),
      cardsByList: {},
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
    backlogListCards() {
      let cards = [];
      this.backlogListIds.forEach((listId) => {
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
    allListCards() {
      return Object.values(this.cardsByList).flat();
    },
    lists() {
      return this.$store.state.lists;
    },
    allCardsByList() {
      return this.$store.state.allCardsByList;
    },
    allCardsActivities() {
      return this.$store.state.allCardsActivities;
    },
    ready() {
      return this.$store.state.ready;
    },
  },
  mounted() {
    while (!this.ready);
    this.getSelectedCards();
    this.getSelectedActivities();
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
    selectedMembers() {
      this.getSelectedCards();
      this.getSelectedActivities();
    },
  },
  methods: {
    getNumberOfCards() {
      return Object.values(this.cardsByList).flat().length;
    },
    getSelectedCards() {
      this.lists.forEach((list) => {
        if (this.allCardsByList[list.id] === undefined) return;
        this.$set(this.cardsByList, list.id, this.allCardsByList[list.id].filter(
          (card) =>
            card.labels.map((label) => label.id).some((cardLabel) => this.selectedLabels.includes(cardLabel)) ||
            (this.selectedLabels.includes(null) ? card.labels.length === 0 : false)
        ).filter((card) =>
          card.idMembers.some((memberId) => this.selectedMembers.includes(memberId)) ||
          (this.selectedMembers.includes(null) ? card.idMembers.length === 0 : false)
        ));
      });
    },
    getSelectedActivities() {
      this.cardActivities = this.allCardsActivities.filter(
        (activity) => Object.values(this.cardsByList).flat().map((card) => card.id)
          .includes(activity.data.card.id)
      ).filter((activity) => moment(activity.date).isSameOrAfter(this.startDate, 'day'))
        .filter((activity) => moment(activity.date).isSameOrBefore(this.endDate, 'day'));
    },
  },
};
</script>

<style lang="scss" src="../assets/styles/board.scss"></style>
