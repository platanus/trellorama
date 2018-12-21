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
      this.chartdata = stackedCardData(this.activities, this.listIds);
      this.$set(this.chartdata, 'labels', this.chartdata.labels);
      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
};
</script>
