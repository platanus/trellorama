<script>
import { Bar } from 'vue-chartjs';
import moment from 'moment';
import { getDate } from '../utils/dateManager.js';
import { getAverageTime, getCardsBetweenTwoLists } from '../utils/timeBetweenLists.js';

export default {
  name: 'historicalLeadTime',
  mixins: [Bar],
  props: {
    activities: {
      type: Array,
      default: null,
    },
    dateTypeSelector: String,
    dayOfWeek: String,
    startDate: Date,
    endDate: Date,
    endListIds: Array,
    progressListIds: Array,
    backlogListIds: Array,
    productionListIds: Array,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      chartdata: {},
    };
  },
  watch: {
    activities() {
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
    this.renderData();
  },
  methods: {
    renderData() {
      this.buildChartData();
      this.renderChart(this.chartdata, this.chartoptions);
    },
    buildChartData() {
      const dateLabels = this.getLabels();
      const data = this.genDatasets(dateLabels);
      const currentDatasets = [
        {
          label: this.$t('leadTime.responseTime'),
          data: data.responseTimes,
          backgroundColor: '#42e2f4',
        },
        {
          label: this.$t('leadTime.cycleTime'),
          data: data.cycleTimes,
          backgroundColor: '#f4e541',
        },
        {
          label: this.$t('leadTime.deployTime'),
          data: data.deployTimes,
          backgroundColor: '#ffa500',
        },
      ];
      this.chartdata = {
        labels: dateLabels,
        datasets: currentDatasets,
      };
    },
    getLabels() {
      let start = getDate(this.endDate, this.dateTypeSelector, this.dayOfWeek);
      const end = getDate(this.startDate, this.dateTypeSelector, this.dayOfWeek);
      const labels = [start];
      while (!moment(start).isSame(end, 'day')) {
        start = getDate(moment(start).subtract(1, `${this.dateTypeSelector}s`), this.dateTypeSelector, this.dayOfWeek);
        labels.unshift(start);
      }

      return labels;
    },
    calculate(cardActivities) {
      const responseTime = parseFloat(getAverageTime(
        ...getCardsBetweenTwoLists(cardActivities, this.backlogListIds, this.progressListIds),
        1
      )) || 0;
      const cycleTime = parseFloat(getAverageTime(
        ...getCardsBetweenTwoLists(cardActivities, this.progressListIds, this.endListIds),
        1
      )) || 0;
      const deployTime = parseFloat(getAverageTime(
        ...getCardsBetweenTwoLists(cardActivities, this.endListIds, this.productionListIds),
        1
      )) || 0;

      return {
        responseTime,
        cycleTime,
        deployTime,
      };
    },
    genDatasets(labels) {
      const responseTimes = [];
      const cycleTimes = [];
      const deployTimes = [];
      let data;
      labels.forEach((label) => {
        data = this.calculate(
          this.activities.filter((activity) => moment(activity.date).isSameOrBefore(label, this.dateTypeSelector))
        );
        responseTimes.push(data.responseTime);
        cycleTimes.push(data.cycleTime);
        deployTimes.push(data.deployTime);
      });

      return {
        responseTimes,
        cycleTimes,
        deployTimes,
      };
    },
  },
};
</script>
