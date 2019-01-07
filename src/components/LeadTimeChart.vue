<script>
import { Doughnut } from 'vue-chartjs';
import { getColor } from '../utils/chartUtils.js';
import { getBoardCards, getAverageTime } from '../utils/timeBetweenLists.js';

export default {
  name: 'ProjectionChart',
  mixins: [Doughnut],
  props: {
    filteredActivities: {
      type: Array,
      default: null,
    },
    cardActivities: Array,
    endListId: String,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartdata: {
        labels: ['Lead Time', 'Response Time', 'Cycle Time', 'Deploy Time'],
        datasets: [
          {
            data: [0, 0, 0, 0],
            backgroundColor: [
              getColor('blue')[0],
              getColor('red')[0],
              getColor('green')[0],
              getColor('fullOrange')[0],
            ],
          },
          {
            data: [0, 0, 0, 0],
            backgroundColor: [
              getColor('blue')[0],
              getColor('red')[0],
              getColor('green')[0],
              getColor('fullOrange')[0],
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  methods: {
    renderData() {
      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
  watch: {
    cardActivities() {
      this.chartdata.datasets[0].data[0] = getAverageTime(...getBoardCards(this.cardActivities, this.endListId));
      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
};

</script>
