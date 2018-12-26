<script>
import { Line, mixins } from 'vue-chartjs';
import { getLabels, buildChartDataSet, getColor } from '../utils/chartUtils.js';
import { addToDate } from '../utils/dateManager.js';

const { reactiveData } = mixins;

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
      let dateLabels = getLabels(this.filteredActivities);
      const currentDataset = buildChartDataSet(this.filteredActivities, dateLabels, 'Current Progression', { color: 'black', fill: false });
      const currentProjection = this.projectData(
        this.speed,
        this.timeUnitsForward,
        { dataset: currentDataset, labels: dateLabels },
        { colors: getColor('blue'), label: 'Current Projection' }
      );
      dateLabels = currentProjection.labels;
      this.chartdata = {
        labels: dateLabels,
        datasets: [currentDataset, currentProjection.dataset],
      };
    },
    projectData(projectionRate, timeUnitsForward, baseDataset, datasetOptions) {
      const newLabels = baseDataset.labels.slice();
      let latestLabel = newLabels[newLabels.length - 1];
      const projectedDataset = JSON.parse(JSON.stringify(baseDataset.dataset));

      projectedDataset.borderColor = datasetOptions.colors[0];
      projectedDataset.backgroundColor = datasetOptions.colors[1];
      projectedDataset.label = datasetOptions.label;

      const lastValue = baseDataset.dataset.data[baseDataset.dataset.data.length - 1];
      [...Array(timeUnitsForward + 1).keys()].forEach((timeUnit) => {
        latestLabel = addToDate(latestLabel, timeUnit + 1, 'week');
        newLabels.push(latestLabel);
        projectedDataset.data.push(lastValue + (projectionRate * (timeUnit + 1)));
      });

      return {
        labels: newLabels,
        dataset: projectedDataset,
      };
    },
  },
};
</script>
