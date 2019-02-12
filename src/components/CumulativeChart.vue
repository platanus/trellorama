<script>
import { Line, mixins } from 'vue-chartjs';
import stackedCardData from '../utils/stackedCardData.js';

const { reactiveData } = mixins;

export default {
  name: 'CumulativeChart',
  mixins: [Line, reactiveData],
  props: {
    activities: {
      type: Array,
      default: null,
    },
    listIds: Array,
    fillBackLists: Boolean,
    dateTypeSelector: String,
    dayOfWeek: String,
    startDate: Date,
    endDate: Date,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        chartdata: {},
      },
    };
  },
  watch: {
    activities() {
      this.renderData();
    },
    fillBackLists() {
      this.renderData();
    },
    dateTypeSelector() {
      this.renderData();
    },
    dayOfWeek() {
      this.renderData();
    },
  },
  computed: {
    cards() {
      return Object.values(this.$store.state.allCardsByList).flat();
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  methods: {
    renderData() {
      this.chartdata = stackedCardData(
        this.activities,
        this.listIds,
        this.fillBackLists,
        {
          dateTypeSelector: this.dateTypeSelector,
          dayOfWeek: this.dayOfWeek,
          startDate: this.startDate,
          endDate: this.endDate,
        },
        this.cards,
      );
      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
};
</script>
