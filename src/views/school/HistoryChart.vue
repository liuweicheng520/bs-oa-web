<template>
    <div class="h-c">
        <ve-line :data="chartData"></ve-line>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {VeLine} from 'v-charts';
  import {Loading} from "@/plugins/Loading";
  import {Request} from "@/plugins/Request";
  import {StatisticsApi} from "@/apis/StatisticsApi";

  @Component({
    name: 'HistoryChart',
    components: {VeLine}
  })
  export default class HistoryChart extends Vue {
    //data
    chartData = {
      columns: ['日期', '数量'],
      rows: []
    };

    //mounted
    mounted() {
      this.loadData();
    }

    //methods
    async loadData() {
      Loading.start();
      this.chartData.rows = await Request
        .run<never[]>(StatisticsApi.GET_HISTORY())
        .finally(Loading.close);
    }
  }
</script>

<style lang="stylus" scoped>
    .h-c {

    }
</style>