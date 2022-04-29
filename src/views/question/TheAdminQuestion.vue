<template>
    <div class="admin-article">
        <breadcrumb-header :items="['管理员','试卷管理','题目管理']"></breadcrumb-header>

        <query-header v-model="query" :page="page" @search="loadList">
            <template #operation>
                <el-button size="mini" @click="addClick">新增题目</el-button>
            </template>
            <el-row>
                <query-input v-model="query.questionTitle" label="问题题目"></query-input>
            </el-row>
        </query-header>

        <el-table :data="list">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
            <el-table-column prop="questionTitle" label="问题题目" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
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

        <pagination-base v-model="page" @current-change="loadList"></pagination-base>

        <template>
            <question-dialog
                    v-if="editDialog.visible"
                    v-model="editDialog.visible"
                    :type="editDialog.type"
                    :id="editDialog.data.id"
                    :group-id="editDialog.data.questionGroupId"
                    @submit="loadList">
            </question-dialog>
        </template>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {QuestionBean} from "@/beans/QuestionBean";
import {Loading} from "@/plugins/Loading";
import {Request} from "@/plugins/Request";
import {QuestionApi} from "@/apis/QuestionApi";
import {PageResultBean} from "@/beans/base/PageResultBean";
import {Page} from "@/components/pagination/Page";
import PaginationBase from "@/components/pagination/PaginationBase.vue";
import {Dialog} from "@/components/dialog/Dialog";
import {DialogType} from "@/components/dialog/DialogType";
import BreadcrumbHeader from "@/components/header/BreadcrumbHeader.vue";
import QueryHeader from "@/components/header/QueryHeader.vue";
import QueryInput from "@/components/header/QueryInput.vue";
import QuestionDialog from "@/views/question/dialog/QuestionDialog.vue";

@Component({
  name: 'TheAdminQuestion',
  components: {QuestionDialog, QueryInput, QueryHeader, BreadcrumbHeader, PaginationBase}
})
export default class TheAdminQuestion extends Vue {
  //data
  previewDialog: Dialog<QuestionBean> = Dialog.init();
  editDialog: Dialog<QuestionBean> = Dialog.init();
  query: QuestionBean = {};
  page: Page = Page.init();
  list: QuestionBean[] = [];

  get id() {
    const id = this.$route.params['id'];
    return Number.parseInt(id?.toString());
  }

  //mounted
  mounted() {
  }

  //methods
  async loadList() {
    Loading.start();
    const page = await Request
      .run<PageResultBean<QuestionBean>>(QuestionApi.GET_PAGE({
        ...this.query,
        ...this.page,
        questionGroupId: this.id,
      }))
      .finally(Loading.close);

    this.page = Page.from(page);
    this.list = Page.list(page);
  }

  addClick() {
    this.editDialog.show({
      questionGroupId: this.id,
    }, DialogType.ADD);
  }

  editClick(bean: QuestionBean) {
    this.editDialog.show(bean, DialogType.EDIT);
  }

  async deleteClick(bean: QuestionBean) {
    await this.$confirm('是否删除?', '提示', {type: 'warning'});
    if (bean.id) {
      await Request.run(QuestionApi.DELETE(bean.id));
      await this.loadList();
    }
  }

  onPageChange(current: number) {
    this.page.setCurrent(current);
    this.loadList();
  }
}
</script>

<style lang="stylus" scoped>
.admin-article {
  width 95%
  margin auto
}
</style>