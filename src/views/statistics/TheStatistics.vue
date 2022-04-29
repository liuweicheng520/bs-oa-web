<template>
    <div class="statistics">
        <el-tabs v-model="active" tab-position="left" stretch>
            <el-tab-pane label="区域学校图" name="区域学校图" lazy>
                <div class="chart">
                    <s-area></s-area>
                </div>
            </el-tab-pane>
            <el-tab-pane label="归属占比图" name="归属占比图" lazy>
                <div class="chart">
                    <s-belong></s-belong>
                </div>
            </el-tab-pane>
            <el-tab-pane label="特性占比图" name="特性占比图" lazy>
                <div class="chart">
                    <s-feature></s-feature>
                </div>
            </el-tab-pane>
            <el-tab-pane label="院校录取分" name="院校录取分" lazy>
                <div class="chart">
                    <s-score></s-score>
                </div>
            </el-tab-pane>
            <el-tab-pane label="院校人数" name="院校人数" lazy>
                <div class="chart">
                    <s-number></s-number>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SArea from "@/views/statistics/SArea.vue";
import SBelong from "@/views/statistics/SBelong.vue";
import SFeature from "@/views/statistics/SFeature.vue";
import SScore from "@/views/statistics/SScore.vue";
import SNumber from "@/views/statistics/SNumber.vue";


@Component({
  name: 'TheStatistics',
  components: {SNumber, SScore, SFeature, SBelong, SArea},
})
export default class TheStatistics extends Vue {
  //data
  active = '区域学校图';

  //mounted
  mounted() {

  }

  //methods

}
</script>

<style lang="stylus" scoped>
.statistics {
  width 100%
  padding 20px
  background-color #fff
}

.chart {
}
</style>