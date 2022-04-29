<template>
  <div class="admin-school">
    <breadcrumb-header :items="['管理员','待办事项管理']"></breadcrumb-header>

    <query-header v-model="query" :page="page" @search="loadListData">
      <template #operation>
        <el-button size="mini" @click="addClick">新增待办事项</el-button>
      </template>
      <el-row>
        <query-input v-model="query.schoolName" label="事件标题"></query-input>
      </el-row>
    </query-header>


    <el-table :data="list">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="schoolName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="area" label="办理时间" align="center"></el-table-column>
      <el-table-column prop="belong" label="事件标题" align="center"></el-table-column>
      <el-table-column prop="belong" label="事件内容" align="center"></el-table-column>
      <table-column-time prop="belong" label="记录时间" align="center"></table-column-time>
      <table-column-time prop="updateTime"></table-column-time>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template #default="scope">
          <el-button style="color: #5daf34"
                     type="text"
                     size="small"
                     @click="editClick(scope.row)">编辑
          </el-button>
          <el-button style="color: #ff4d51"
                     type="text"
                     size="small"
                     @click="deleteClick(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination-base v-model="page" @current-change="onPageChange"></pagination-base>

    <template>
      <school-edit-dialog
          v-if="editDialog.visible"
          v-model="editDialog.visible"
          :type="editDialog.type"
          :id="editDialog.data.id"
          @submit="loadListData()">

      </school-edit-dialog>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SchoolBean} from "@/beans/SchoolBean";
import {Request} from "@/plugins/Request";
import {SchoolApi} from "@/apis/SchoolApi";
import {PageResultBean} from "@/beans/base/PageResultBean";
import {Page} from "@/components/pagination/Page";
import {SchoolQueryParam} from "@/params/query/SchoolQueryParam";
import PaginationBase from "@/components/pagination/PaginationBase.vue";
import BreadcrumbHeader from "@/components/header/BreadcrumbHeader.vue";
import QueryHeader from "@/components/header/QueryHeader.vue";
import QueryInput from "@/components/header/QueryInput.vue";
import TableColumnTime from "@/components/table/TableColumnTime.vue";
import SchoolEditDialog from "@/views/school/dialog/SchoolEditDialog.vue";
import {Dialog} from "@/components/dialog/Dialog";
import {DialogType} from "@/components/dialog/DialogType";

@Component({
  name: 'TheAdminSchool',
  components: {SchoolEditDialog, TableColumnTime, QueryInput, QueryHeader, BreadcrumbHeader, PaginationBase}
})
export default class TheAdminSchool extends Vue {
  //data
  editDialog: Dialog<SchoolBean> = Dialog.init();
  query: SchoolQueryParam = {};
  page: Page = Page.init();
  list: SchoolBean[] = [];

  //mounted
  mounted() {
    this.loadListData();
  }

  //methods
  async loadListData() {
    // const page = await Request
    //   .run<PageResultBean<SchoolBean>>(SchoolApi.GET_PAGE({
    //     ...this.query,
    //     ...this.page
    //   }));
    //
    // this.page = Page.from(page);
    // this.list = Page.list(page);
  }

  addClick() {
    this.editDialog.show({}, DialogType.ADD);
  }

  editClick(school: SchoolBean) {
    this.editDialog.show(school, DialogType.EDIT)
  }

  async deleteClick(bean: SchoolBean) {
    await this.$confirm('是否删除?', '提示', {type: 'warning'});
    if (bean.id) {
      await Request.run(SchoolApi.DELETE(bean.id));
      this.loadListData();
    }
  }

  onPageChange(current: number) {
    this.page.setCurrent(current);
    this.loadListData();
  }
}
</script>

<style lang="stylus" scoped>
.admin-school {
  width 95%
  margin auto
}

.header {
  margin 15px auto
}

.search-input {
  width 200px
  margin 0 10px
}
</style>
