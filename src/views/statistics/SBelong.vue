<template>
    <div class="s-belong">
        <ve-pie :data="chartData"></ve-pie>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {VePie} from "v-charts";
  import {Loading} from "@/plugins/Loading";
  import {Request} from "@/plugins/Request";
  import {StatisticsApi} from "@/apis/StatisticsApi";

  @Component({
    name: 'SBelong',
    components: {VePie}
  })
  export default class SBelong extends Vue {
    //data
    chartData = {
      columns: ['归属', '学校数'],
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
        .run<never[]>(StatisticsApi.GET_BELONG())
        .finally(Loading.close);
    }
  }
</script>

<style lang="stylus" scoped>
    .s-belong {
        width 80%
        margin 20px auto
    }
</style>