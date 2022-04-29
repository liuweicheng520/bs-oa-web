<template>
    <div class="s-area">
        <ve-histogram :data="chartData" style="width: 100%"></ve-histogram>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import VeHistogram from "v-charts/lib/histogram";
  import {Request} from "@/plugins/Request";
  import {StatisticsApi} from "@/apis/StatisticsApi";
  import {Loading} from "@/plugins/Loading";

  @Component({
    name: 'SArea',
    components: {VeHistogram}
  })
  export default class SArea extends Vue {
    //data
    chartData = {
      columns: ['地域', '学校数'],
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
        .run<never[]>(StatisticsApi.GET_AREA())
        .finally(Loading.close);
    }
  }
</script>

<style lang="stylus" scoped>
    .s-area {
        width 80%
        margin 20px auto
    }
</style>