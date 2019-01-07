<script>
import { Doughnut } from 'vue-chartjs';
import { getColor } from '../utils/chartUtils.js';
import { getAverageTime, getCardsBetweenTwoLists } from '../utils/timeBetweenLists.js';

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
    progressStartListId: String,
    backlogListId: String,
    productionListId: String,
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
      const leadTime = getAverageTime(
        ...getCardsBetweenTwoLists(this.cardActivities, this.backlogListId, this.endListId)
      );
      const responseTime = getAverageTime(
        ...getCardsBetweenTwoLists(this.cardActivities, this.backlogListId, this.progressStartListId)
      );
      const cycleTime = getAverageTime(
        ...getCardsBetweenTwoLists(this.cardActivities, this.progressStartListId, this.endListId)
      );
      const deployTime = getAverageTime(
        ...getCardsBetweenTwoLists(this.cardActivities, this.endListId, this.productionListId)
      );

      this.chartdata.datasets[0].data = [leadTime, 0, 0, 0];
      this.chartdata.datasets[1].data = [0, responseTime, cycleTime, deployTime];

      this.renderChart(this.chartdata, this.chartoptions);
    },
  },
};

</script>
