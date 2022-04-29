<template>
    <div class="collect">
        <el-table :data="list">
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="targetType" label="目标类型" align="center"></el-table-column>
            <el-table-column prop="targetId" label="名称" align="center">
                <template #default="{row}">
                    <span v-if="row.target.articleName" v-text="row.target.articleName"></span>
                    <span v-else v-text="row.target.schoolName"></span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template #default="{row}">
                    <el-button style="color: #3a8ee6"
                               type="text"
                               size="small"
                               @click="checkClick(row)">前往
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination-base v-model="page" @current-change="onPageChange"></pagination-base>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PaginationBase from "@/components/pagination/PaginationBase.vue";
import {Page} from "@/components/pagination/Page";
import {UserCollectBean} from "@/beans/UserCollectBean";
import {Loading} from "@/plugins/Loading";
import {Request} from "@/plugins/Request";
import {PageResultBean} from "@/beans/base/PageResultBean";
import {UserCollectApi} from "@/apis/UserCollectApi";

@Component({
  name: 'TheCollect',
  components: {PaginationBase}
})
export default class TheCollect extends Vue {
  //data
  query: UserCollectBean = {};
  page: Page = Page.init();
  list: UserCollectBean[] = [];

  //mounted
  mounted() {
    this.loadList();
  }

  //methods
  async loadList() {
    Loading.start();
    const page = await Request
      .run<PageResultBean<UserCollectBean>>(UserCollectApi.GET_PAGE({
        ...this.query,
        ...this.page,
      }))
      .finally(Loading.close);
    this.page = Page.from(page);
    this.list = Page.list(page);
  }

  checkClick(collect: UserCollectBean) {
    if (collect.targetType === '学校') {
      this.$router.push('/home/school/' + collect.targetId);
    } else {
      this.$router.push('/home/article/' + collect.targetId);
    }
  }

  onPageChange(current: number) {
    this.page.setCurrent(current);
    this.loadList();
  }
}
</script>

<style lang="stylus" scoped>
.collect {
  width 90%
  margin 0 auto
}
</style>