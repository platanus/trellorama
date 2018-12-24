<script>
import { Line, mixins } from 'vue-chartjs';
import stackedCardData from '../utils/stackedCardData.js';

const { reactiveData } = mixins;

export default {
  name: 'StackedChart',
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
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  methods: {
    renderData() {
      this.chartdata = stackedCardData(
        this.activities,
        this.listIds,
        this.fillBackLists,
        [this.dateTypeSelector, this.dayOfWeek]
      );
      this.$set(this.chartdata, 'labels', this.chartdata.labels);
      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
};
</script>
