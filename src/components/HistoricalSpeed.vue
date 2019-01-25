<script>
import { Line } from 'vue-chartjs';
import moment from 'moment';
import { fillDatasetGaps, fillFromStartDate, getColor } from '../utils/chartUtils.js';
import { getDate } from '../utils/dateManager.js';
import { filterActivities, speedProjection } from '../utils/speedUtil.js';

export default {
  name: 'historicalSpeed',
  mixins: [Line],
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
      const currentDataset = {
        labels: '',
        data: dateLabels.map((label) =>
          this.getSpeed(label)
        ),
        backgroundColor: getColor('speedBlue')[0],
        borderColor: getColor('speedBlue')[1],
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
    getSpeed(endDate) {
      return speedProjection(
        filterActivities(
          this.activities.filter((activity) => moment(activity.date).isSameOrBefore(endDate, 'day')),
          this.endListIds,
          this.dateTypeSelector
        ),
        this.startDate,
        endDate,
        true
      );
    },
    getLabels() {
      return [...new Set(
        this.activities.map((activity) => getDate(activity.date, this.dateTypeSelector, this.dayOfWeek))
      )]
        .sort((date1, date2) => moment(date1) - moment(date2));
    },
  },
};
</script>
