<template>
    <div class="admin-article">
        <breadcrumb-header :items="['管理员','文章管理']"></breadcrumb-header>

        <query-header v-model="query" :page="page" @search="loadListData">
            <template #operation>
                <el-button size="mini" @click="addClick">新增文章</el-button>
            </template>
            <el-row>
                <query-input v-model="query.articleName" label="文章名称"></query-input>
                <query-input v-model="query.articleType" label="文章类型"></query-input>
            </el-row>
        </query-header>

        <el-table :data="list">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="articleName" label="文章名称" align="center"></el-table-column>
            <el-table-column prop="articleType" label="文章类型" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template #default="scope">
                    <el-button style="color: #3a8ee6"
                               type="text"
                               size="small"
                               @click="previewClick(scope.row)">预览
                    </el-button>
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
            <article-preview-dialog
                    v-if="previewDialog.visible"
                    v-model="previewDialog.visible"
                    :article-id="previewDialog.data.id">

            </article-preview-dialog>
            <article-edit-dialog
                    v-if="editDialog.visible"
                    v-model="editDialog.visible"
                    :type="editDialog.type"
                    :id="editDialog.data.id"
                    @submit="loadListData()">

            </article-edit-dialog>
        </template>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ArticleBean} from "@/beans/ArticleBean";
  import {Loading} from "@/plugins/Loading";
  import {Request} from "@/plugins/Request";
  import {ArticleApi} from "@/apis/ArticleApi";
  import {PageResultBean} from "@/beans/base/PageResultBean";
  import {Page} from "@/components/pagination/Page";
  import {ArticleQueryParam} from "@/params/query/ArticleQueryParam";
  import PaginationBase from "@/components/pagination/PaginationBase.vue";
  import ArticlePreviewDialog from "@/views/article/dialog/ArticlePreviewDialog.vue";
  import {Dialog} from "@/components/dialog/Dialog";
  import ArticleEditDialog from "@/views/article/dialog/ArticleEditDialog.vue";
  import {DialogType} from "@/components/dialog/DialogType";
  import BreadcrumbHeader from "@/components/header/BreadcrumbHeader.vue";
  import QueryHeader from "@/components/header/QueryHeader.vue";
  import QueryInput from "@/components/header/QueryInput.vue";

  @Component({
    name: 'TheAdminArticle',
    components: {QueryInput, QueryHeader, BreadcrumbHeader, ArticleEditDialog, ArticlePreviewDialog, PaginationBase}
  })
  export default class TheAdminArticle extends Vue {
    //data
    previewDialog: Dialog<ArticleBean> = Dialog.init();
    editDialog: Dialog<ArticleBean> = Dialog.init();
    query: ArticleQueryParam = {};
    page: Page = Page.init();
    list: ArticleBean[] = [];

    //mounted
    mounted() {
    }

    //methods
    async loadListData() {
      Loading.start();
      const page = await Request
        .run<PageResultBean<ArticleBean>>(ArticleApi.GET_LIST({
          ...this.query,
          ...this.page
        }))
        .finally(Loading.close);

      this.page = Page.from(page);
      this.list = Page.list(page);
    }

    previewClick(bean: ArticleBean) {
      this.previewDialog.show(bean);
    }

    addClick() {
      this.editDialog.show({}, DialogType.ADD);
    }

    editClick(bean: ArticleBean) {
      this.editDialog.show(bean, DialogType.EDIT);
    }

    async deleteClick(bean: ArticleBean) {
      await this.$confirm('是否删除?', '提示', {type: 'warning'});
      if (bean.id) {
        await Request.run(ArticleApi.DELETE(bean.id));
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
    .admin-article {
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