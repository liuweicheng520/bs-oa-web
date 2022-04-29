<template>
    <div class="s-score">
        <el-table :data="list">
            <el-table-column prop="schoolName" label="院校名称" align="center"></el-table-column>
            <el-table-column prop="belong" label="隶属" align="center"></el-table-column>
            <el-table-column label="最低录取分" align="center">
                <template #default="{row}">
                    <span v-text="row.info['最低录取分']"></span>
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

@Component({
  name: 'SScore'
})
export default class SScore extends Vue {
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
    this.list = list.sort((o1: any, o2: any) => {
      return o2.info['最低录取分'] as number - o1.info['最低录取分'] as number;
    });
  }

}
</script>

<style lang="stylus" scoped>
.s-score {

}
</style>