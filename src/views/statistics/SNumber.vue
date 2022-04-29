<template>
    <div class="s-score">
        <el-table :data="list">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div style="width: 100%;height: 300px">
                        <ve-pie v-if="props.row.chartData" :data="props.row.chartData"></ve-pie>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="院校名称" align="center"></el-table-column>
            <el-table-column prop="belong" label="隶属" align="center"></el-table-column>
            <el-table-column label="总人数" align="center">
                <template #default="{row}">
                    <span v-text="row.info['学校总人数']"></span>
                </template>
            </el-table-column>
            <el-table-column label="往期人数" align="center">
                <template #default="{row}">
                    <span v-text="row.info['往期人数']"></span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SchoolBean} from "@/beans/SchoolBean";
import {Request} from "@/plugins/Request";
import {SchoolApi} from "@/apis/SchoolApi";
import {VePie} from "v-charts";

@Component({
  name: 'SNumber',
  components: {VePie}
})
export default class SNumber extends Vue {
  //data
  list: SchoolBean[] = [];

  //mounted
  mounted() {
    this.loadList();
  }

  //methods
  async loadList() {
    const list = await Request
      .run<SchoolBean[]>(SchoolApi.GET_LIST({}));
    list.forEach((item: any) => {
      item.chartData = {
        columns: ['性别', '人数'],
        rows: [
          {
            '性别': '男',
            '人数': item.info['男生人数'] as any
          }, {
            '性别': '女',
            '人数': item.info['女生人数'] as any
          },
        ]
      };
    })
    this.list = list.sort((o1: any, o2: any) => {
      return o2.info['学校总人数'] as number - o1.info['学校总人数'] as number;
    });
  }

}
</script>

<style lang="stylus" scoped>
.s-score {

}
</style>