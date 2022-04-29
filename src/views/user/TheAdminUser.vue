<template>
    <div class="admin-user">
        <breadcrumb-header :items="['管理员','用户管理']"></breadcrumb-header>

        <query-header v-model="query" :page="page" @search="loadList">
            <template #operation>
            </template>
            <el-row>
                <query-input v-model="query.username" label="用户名"></query-input>
            </el-row>
        </query-header>

        <el-table :data="list" @selection-change="arr=>selects = arr">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" align="center"></el-table-column>
            <el-table-column prop="roleCodeMessage" label="角色" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        </el-table>

        <pagination-base v-model="page" @current-change="loadList"></pagination-base>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {UserBean} from "@/beans/UserBean";
  import BreadcrumbHeader from "@/components/header/BreadcrumbHeader.vue";
  import QueryHeader from "@/components/header/QueryHeader.vue";
  import {UserQueryParam} from "@/params/query/UserQueryParam";
  import {Page} from "@/components/pagination/Page";
  import QueryInput from "@/components/header/QueryInput.vue";
  import QuerySelect from "@/components/header/QuerySelect.vue";
  import {Loading} from "@/plugins/Loading";
  import {PageResultBean} from "@/beans/base/PageResultBean";
  import {Request} from "@/plugins/Request";
  import {UserApi} from "@/apis/UserApi";
  import PaginationBase from "@/components/pagination/PaginationBase.vue";
  import TableColumnTime from "@/components/table/TableColumnTime.vue";
  import CommonLink from "@/components/common/CommonLink.vue";
  import {RoleEnum} from "@/enums/RoleEnum";

  @Component({
    name: 'TheAdminUser',
    components: {
      CommonLink,
      TableColumnTime, PaginationBase, QuerySelect, QueryInput, QueryHeader, BreadcrumbHeader
    }
  })
  export default class TheAdminUser extends Vue {
    //data
    query: UserQueryParam = {};
    page: Page = Page.init();
    list: UserBean[] = [];
    selects = [];

    //mounted
    mounted() {
    }

    //methods
    async loadList() {
      Loading.start();
      const page = await Request
        .run<PageResultBean<UserBean>>(UserApi.GET_PAGE({
          ...this.query,
          ...this.page,
          roleCode: RoleEnum.COMMON.name
        }))
        .finally(Loading.close);
      this.page = Page.from(page);
      this.list = Page.list(page);
    }

  }
</script>

<style lang="stylus" scoped>
    .admin-user {
        width 95%
        margin auto
    }

    .table-expand {
        width 90%
        margin auto
        font-size 0

        .el-form-item {
            margin-right 0
            margin-bottom 0
            width 50%
        }

        .link {
            margin-right 10px
            font-size .9em
        }
    }
</style>