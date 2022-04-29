<template>
    <div class="school">

        <el-card class="query-card">
            <el-row class="filter" type="flex" align="middle">
                <el-col class="filter-title" :span="3">
                    <span>名称：</span>
                </el-col>

                <el-col class="filter-list" :span="21">
                    <el-input v-model.trim="query.schoolName" size="mini"
                              style="width: 300px" clearable
                              @keydown.native.enter="loadListData"
                              @clear="loadListData">
                        <template #append>
                            <el-button icon="el-icon-search" @click="loadListData"></el-button>
                        </template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row class="filter" type="flex" align="middle">
                <el-col class="filter-title" :span="3">
                    <span>地区：</span>
                </el-col>

                <el-col class="filter-list" :span="21">
                    <span v-for="area of areas"
                          :key="area"
                          :class="area === query.area?'filter-active':'filter-item'"
                          v-text="area"
                          @click="areaClick(area)"></span>
                </el-col>
            </el-row>
            <el-row class="filter" type="flex" align="middle">
                <el-col class="filter-title" :span="3">
                    <span>归属：</span>
                </el-col>

                <el-col class="filter-list" :span="21">
                    <span v-for="belong of belongs"
                          :key="belong"
                          :class="belong === query.belong?'filter-active':'filter-item'"
                          v-text="belong"
                          @click="belongClick(belong)"></span>
                </el-col>
            </el-row>
            <el-row class="filter" type="flex" align="middle">
                <el-col class="filter-title" :span="3">
                    <span>特性：</span>
                </el-col>

                <el-col class="filter-list" :span="21">
                    <el-checkbox v-model="query.featureYjs" @change="loadListData">研究生院</el-checkbox>
                    <el-checkbox v-model="query.featureZhx" @change="loadListData">自划线</el-checkbox>
                </el-col>
            </el-row>
        </el-card>

        <el-table :data="list">
            <el-table-column prop="schoolName" label="收藏" align="center">
                <template #default="{row}">
                    <el-button type="text"
                               style="color: orange"
                               :icon="row.isCollect?'el-icon-star-on':'el-icon-star-off'"
                               size="sm"
                               @click.stop="collectClick(row)"></el-button>
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校名称" align="center"></el-table-column>
            <el-table-column prop="area" label="地区" align="center"></el-table-column>
            <el-table-column prop="belong" label="隶属" align="center"></el-table-column>
            <el-table-column prop="featureYjs" label="研究生院" align="center">
                <template #default="{row:{featureYjs}}">
                    <i v-if="featureYjs" class="el-icon-check"></i>
                </template>
            </el-table-column>
            <el-table-column prop="featureZhx" label="自划线" align="center">
                <template #default="{row:{featureZhx}}">
                    <i v-if="featureZhx" class="el-icon-check"></i>
                </template>
            </el-table-column>
            <el-table-column prop="times" label="热度" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template #default="{row}">
                    <el-button style="color: #3a8ee6"
                               type="text"
                               size="small"
                               @click="checkClick(row)">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination-base v-model="page" @current-change="onPageChange"></pagination-base>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Page} from "@/components/pagination/Page";
import {SchoolBean} from "@/beans/SchoolBean";
import {Loading} from "@/plugins/Loading";
import {PageResultBean} from "@/beans/base/PageResultBean";
import {SchoolApi} from "@/apis/SchoolApi";
import {Request} from "@/plugins/Request";
import {SchoolQueryParam} from "@/params/query/SchoolQueryParam";
import PaginationBase from "@/components/pagination/PaginationBase.vue";
import {UserCollectBean} from "@/beans/UserCollectBean";
import {UserCollectApi} from "@/apis/UserCollectApi";
import {LoginInfoBean} from "@/beans/LoginInfoBean";
import {LoginApi} from "@/apis/LoginApi";

@Component({
  name: 'TheSchool',
  components: {PaginationBase}
})
export default class TheSchool extends Vue {
  //data
  areas: string[] = [];
  belongs: string[] = [];
  query: SchoolQueryParam = {};
  page: Page = Page.init();
  list: SchoolBean[] = [];
  loginInfo: LoginInfoBean = {};

  //mounted
  mounted() {
    this.loadAreasData();
    this.loadBelongsData();
    this.loadLoginInfo();
  }

  //methods
  async loadLoginInfo() {
    const loginInfo = await Request.run<LoginInfoBean>(LoginApi.GET_LOGIN());
    this.loginInfo = loginInfo ?? {};
    await this.loadListData();
  }

  async loadAreasData() {
    this.areas = await Request.run<string[]>(SchoolApi.GET_AREA_LIST());
  }

  async loadBelongsData() {
    this.belongs = await Request.run<string[]>(SchoolApi.GET_BELONG_LIST());
  }

  async loadListData() {
    Loading.start();
    const page = await Request
      .run<PageResultBean<SchoolBean>>(SchoolApi.GET_PAGE({
        ...this.query,
        ...this.page
      }))
      .finally(Loading.close);

    if (this.loginInfo.id) {
      for (let school of page.list) {
        const list = await this.isCollect(school);
        // @ts-ignore
        school.isCollect = list[0]?.id;
      }
    }

    this.page = Page.from(page);
    this.list = page.list;
  }

  areaClick(area: string) {
    if (this.query.area === area) {
      this.query.area = undefined;
    } else {
      this.query.area = area;
    }
    this.loadListData();
  }

  belongClick(belong: string) {
    if (this.query.belong === belong) {
      this.query.belong = undefined;
    } else {
      this.query.belong = belong;
    }
    this.loadListData();
  }

  checkClick(bean: SchoolBean) {
    this.$router.push(`/home/school/${bean.id}`)
  }

  async isCollect(school: SchoolBean) {
    if (!this.loginInfo.id) {
      return false;
    }
    const list = await Request.run<UserCollectBean[]>(UserCollectApi.GET_LIST({
      targetType: '学校',
      targetId: school.id,
    }));
    return list ?? [];
  }

  async collectClick(school: SchoolBean) {
    if (school.isCollect) {
      await Request
        .run(UserCollectApi.DELETE(school.isCollect!))
    } else {
      await Request
        .run(UserCollectApi.POST({
          targetType: '学校',
          targetId: school.id,
        }));
    }
    await this.loadListData();
  }

  onPageChange(current: number) {
    this.page.setCurrent(current);
    this.loadListData();
  }
}
</script>

<style lang="stylus" scoped>
.school {
  width 90%
  margin 0 auto
}

.query-card {
  width 100%
  margin 25px auto
}

.filter {
  margin 15px auto
}

.filter-title {
  text-align center
  font-weight bold
}

.filter-list {

}

.filter-item {
  display inline-block
  margin 2px
  padding 3px 6px
  cursor pointer
  transition all .3s ease

  &:hover {
    border-radius 5px
    background-color #eee
  }
}

.filter-active {
  display inline-block
  margin 2px
  padding 3px 6px
  cursor pointer
  border-radius 5px
  background-color #5daf34
  color #fff
}

.card {
  margin 10px auto
  cursor pointer
  padding 0 20px
}
</style>