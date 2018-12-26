<script>
import { Line, mixins } from 'vue-chartjs';
import { getLabels, buildChartDataSet } from '../utils/chartUtils.js';

const { reactiveData } = mixins;

export default {
  name: 'ProyectionChart',
  mixins: [Line, reactiveData],
  props: {
    filteredActivities: {
      type: Array,
      default: null,
    },
    speed: Number,
    timeUnitsForward: Number,
    endListId: String,
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
    filteredActivities() {
      this.renderData();
    },
    speed() {
      this.renderData();
    },
    timeUnitsForward() {
      this.renderData();
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  methods: {
    renderData() {
      this.buildChartData();
      this.renderChart(this.chartdata, this.chartoptions);
    },
    buildChartData() {
      const dateLabels = getLabels(this.filteredActivities);
      const chartDataset = buildChartDataSet(this.filteredActivities, dateLabels, 'Current Progression', { color: 'default', fill: false });
      this.chartdata = {
        labels: dateLabels,
        datasets: [chartDataset],
      };
    },
  },
};
</script>
