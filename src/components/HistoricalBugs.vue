<script>
import { Line } from 'vue-chartjs';
import moment from 'moment';
import { fillDatasetGaps, fillFromStartDate, getColor } from '../utils/chartUtils.js';
import { getDate } from '../utils/dateManager.js';

export default {
  name: 'historicalBugs',
  mixins: [Line],
  props: {
    activities: {
      type: Array,
      default: null,
    },
    dateTypeSelector: String,
    dayOfWeek: String,
    startDate: Date,
  },
  data() {
    return {
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
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
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartoptions);
  },
  methods: {
    renderData() {
      this.buildChartData();
      this.renderChart(this.chartdata, this.chartoptions);
    },
    getSecondToLastItem(array) {
      const numberTwo = 2;

      return array[array.length - numberTwo];
    },
    buildChartData() {
      const dateLabels = [...new Set(this.getLabels(this.activities))]
        .sort((date1, date2) => moment(date1) - moment(date2));
      const currentDataset = {
        label: '',
        data: dateLabels.map((label) => this.activities.filter((activity) =>
          moment(activity.date).isSameOrBefore(label, 'day')).length
        ),
        backgroundColor: getColor('bugRed')[1],
        borderColor: getColor('bugRed')[0],
      };
      fillDatasetGaps(
        dateLabels,
        currentDataset.data,
        {
          dateTypeSelector: this.dateTypeSelector,
          dayOfWeek: this.dayOfWeek,
          endDate: dateLabels[dateLabels.length],
        },
        false
      );
      fillFromStartDate(
        dateLabels,
        currentDataset.data,
        { dateTypeSelector: this.dateTypeSelector, dayOfWeek: this.dayOfWeek, startDate: this.startDate },
        false
      );
      this.chartdata = {
        labels: dateLabels,
        datasets: [currentDataset],
      };
    },
    getLabels() {
      return this.activities.map((activity) => getDate(activity.date, this.dateTypeSelector, this.dayOfWeek));
    },
  },
};
</script>
