<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th v-for="list in lists" v-bind:key="list.id">{{list.name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Number of Cards</th>
                <td v-for="list in lists" v-bind:key="list.id + '_count'">{{ card_count_by_list[list.id].length }}</td>
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
      card_count_by_list: {},
      list_ids: [
        '5bcf863f74837934564848c2',
        '5bcf863f74837934564848c3',
        '5bcf863f74837934564848c4',
        '5bcf863f74837934564848c5',
        '5bcf863f74837934564848c6',
        '5bcf863f74837934564848c7',
        '5bcf863f74837934564848c8'
      ],
      list_includes_archived: ['5bcf863f74837934564848c8']
    };
  },
  props: {
    board_id: String
  },
  mounted() {
    this.get_lists(this.$props.board_id, this.list_ids);
  },
  methods: {
    get_lists(board_id, list_ids) {
      const context = this;
      let url = 'boards/' + board_id + '/lists';
      window.Trello.rest('get', url, function (data) {
        for (let index=0; index<data.length; index++){
          if (list_ids.includes(data[index].id)){
            context.lists.push(data[index]);
            context.count_cards(data[index].id, context.list_includes_archived.includes(data[index].id));
          }
        }
      })
    },
    count_cards(list_id, include_archived) {
      const cards_filter = include_archived ? 'all' : 'open';
      const context = this;
      context.$set(context.card_count_by_list, list_id, []);
      window.Trello.lists.get(list_id, {cards:cards_filter}, function (data) {
        context.card_count_by_list[list_id] = data.cards;
      })
    },
  }
}
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