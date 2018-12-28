<script>
import { Line, mixins } from 'vue-chartjs';
import { getLabels, buildChartDataSet, getColor } from '../utils/chartUtils.js';
import { addToDate } from '../utils/dateManager.js';

const { reactiveData } = mixins;

const daysInAWeek = 7;

export default {
  name: 'ProjectionChart',
  mixins: [Line, reactiveData],
  props: {
    filteredActivities: {
      type: Array,
      default: null,
    },
    speed: Number,
    timeUnitsForward: Number,
    endListId: String,
    dateTypeSelector: String,
    optimistValue: Number,
    pesimistValue: Number,
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
    optimistValue() {
      this.renderData();
    },
    pesimistValue() {
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
      let dateLabels = getLabels(this.filteredActivities);
      const currentDataset = buildChartDataSet(this.filteredActivities, dateLabels, 'Current Progression', { color: 'black', fill: false });
      const currentProjection = this.projectData(
        this.speed,
        this.timeUnitsForward,
        currentDataset,
        { colors: getColor('blue'), label: 'Current Projection' }
      );
      const optimistProjection = this.projectData(
        this.speed + this.optimistValue,
        this.timeUnitsForward,
        currentDataset,
        { colors: getColor('green'), label: 'Optimist Projection' }
      );
      const pesimistProjection = this.projectData(
        this.speed - this.pesimistValue,
        this.timeUnitsForward,
        currentDataset,
        { colors: getColor('red'), label: 'Pesimist Projection' }
      );
      dateLabels = this.extendLabels(dateLabels, this.timeUnitsForward);
      this.chartdata = {
        labels: dateLabels,
        datasets: [currentDataset, currentProjection, optimistProjection, pesimistProjection],
      };
    },
    extendLabels(currentLabels, timeUnitsForward) {
      const newLabels = currentLabels.slice();
      let latestLabel = newLabels[newLabels.length - 1];

      [...Array(timeUnitsForward).keys()].forEach(() => {
        latestLabel = addToDate(latestLabel, 1, this.dateTypeSelector);
        newLabels.push(latestLabel);
      });

      return newLabels;
    },
    adaptProjectionRate(projectionRate, dateType) {
      switch (dateType) {
      case 'week':
        return projectionRate;
      case 'day':
        return projectionRate / daysInAWeek;
      default:
        return projectionRate;
      }
    },
    projectData(projectionRate, timeUnitsForward, baseDataset, datasetOptions) {
      const projectedDataset = JSON.parse(JSON.stringify(baseDataset));

      projectedDataset.borderColor = datasetOptions.colors[0];
      projectedDataset.backgroundColor = datasetOptions.colors[1];
      projectedDataset.label = datasetOptions.label;

      const lastValue = baseDataset.data[baseDataset.data.length - 1];
      [...Array(timeUnitsForward).keys()].forEach((timeUnit) => {
        projectedDataset.data.push(Math.floor(lastValue + (this.adaptProjectionRate(projectionRate, this.dateTypeSelector) * (timeUnit + 1))));
      });

      return projectedDataset;
    },
  },
};
</script>
