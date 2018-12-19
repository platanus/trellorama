<template>
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
                <td v-for="list in lists" v-bind:key="list.id + '_count'">{{ cardCountByList[list.id].length }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: 'BoardInfo',
  data() {
    return {
      lists: [],
      cardCountByList: {},
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
      const url = `boards/${boardId}/lists`;
      window.Trello.rest('get', url, (data) => {
        self.lists = data.filter((element) => listIds.includes(element.id));
        self.lists.forEach((element) => self.getCards(element.id, self.listIncludesArchived.includes(element.id)));
      });
    },
    getCards(listId, includeArchived) {
      const cardsFilter = includeArchived ? 'all' : 'open';
      const self = this;
      self.$set(self.cardCountByList, listId, []);
      window.Trello.lists.get(listId, { cards: cardsFilter }, (data) => {
        data.cards.forEach((element) => self.getCardActivities(element.id));
        self.cardCountByList[listId] = data.cards;
      });
    },
    getCardActivities(cardId) {
      const self = this;
      const url = `cards/${cardId}/actions`;
      window.Trello.rest('get', url, { filter: 'createCard,updateCard:idList' }, (data) => {
        self.cardActivities = self.cardActivities.concat(data);
      });
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
