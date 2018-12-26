<template>
  <div>
    <h1>{{ board.name }}</h1>
    <h2>Tag Filter</h2>
    <v-select multiple v-model="selectedCardLabels" v-bind:options="selectedLabelOptions" />
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
        v-bind:timeUnitsForward="5"
      />
  </div>
</template>

<script>
import vSelect from 'vue-select';
import BoardInfo from './BoardInfo.vue';
import { request, onRequestError } from '../utils/trelloManager.js';
import CumulativeWrapper from './CumulativeWrapper.vue';
import TeamSpeed from './TeamSpeed';
import LeadTime from './LeadTime.vue';
import ProjectionWrapper from './ProjectionWrapper.vue';

export default {
  name: 'Board',
  components: {
    BoardInfo,
    TeamSpeed,
    CumulativeWrapper,
    vSelect,
    LeadTime,
    ProjectionWrapper,
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
      selectedLabelOptions: [],
      selectedCardLabels: [],
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
  },
  methods: {
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
