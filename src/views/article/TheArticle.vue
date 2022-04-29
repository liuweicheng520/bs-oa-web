<template>
    <div class="article">

        <el-card class="query-card">
            <el-row class="filter" type="flex" align="middle">
                <el-col class="filter-title" :span="3">
                    <span>名称：</span>
                </el-col>

                <el-col class="filter-list" :span="21">
                    <el-input v-model.trim="query.articleName" size="mini"
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
                    <span>类型：</span>
                </el-col>

                <el-col class="filter-list" :span="21">
                    <span v-for="type of types"
                          :key="type"
                          :class="type === query.articleType?'filter-active':'filter-item'"
                          v-text="type"
                          @click="filterClick('articleType',type)"></span>
                </el-col>
            </el-row>
            <el-row class="filter" type="flex" align="middle">
                <el-col class="filter-title" :span="3">
                    <span>排序：</span>
                </el-col>

                <el-col class="filter-list" :span="21">
                    <span v-for="type of ['时间','热度']"
                          :key="type"
                          :class="type === query.sort?'filter-active':'filter-item'"
                          v-text="type"
                          @click="filterClick('sort',type)"></span>
                </el-col>
            </el-row>
        </el-card>

        <div style="background-color:#fff;padding-top: 10px">
            <div v-for="article in list" :key="article.id">
                <div class="card" @click="detailClick(article)">
                    <el-row type="flex" align="middle">
                        <el-col :span="1">
                            <el-button type="text"
                                       style="color: orange"
                                       :icon="article.isCollect?'el-icon-star-on':'el-icon-star-off'"
                                       size="sm"
                                       @click.stop="collectClick(article)"></el-button>
                        </el-col>
                        <el-col :span="13">
                            <p v-text="article.articleName"></p>
                        </el-col>
                        <el-col :span="5" style="text-align: right">
                            <el-tag v-text="article.articleType" type="success" size="small"></el-tag>
                        </el-col>

                        <el-col :span="3" style="text-align: right;font-size: .6em;color: #666">
                            <span>热度：</span>
                            <span v-text="article.times"></span>
                        </el-col>

                        <el-col :span="2" style="text-align: right;font-size: .6em;color: #666">
                            <span>评论：</span>
                            <span v-text="article.commentTimes"></span>
                        </el-col>
                    </el-row>
                </div>
                <el-divider></el-divider>
            </div>
        </div>

        <pagination-base v-model="page" @current-change="onPageChange"></pagination-base>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Loading} from "@/plugins/Loading";
import {Request} from "@/plugins/Request";
import {PageResultBean} from "@/beans/base/PageResultBean";
import {ArticleBean} from "@/beans/ArticleBean";
import {ArticleApi} from "@/apis/ArticleApi";
import {Page} from "@/components/pagination/Page";
import PaginationBase from "@/components/pagination/PaginationBase.vue";
import {ArticleQueryParam} from "@/params/query/ArticleQueryParam";
import {SchoolApi} from "@/apis/SchoolApi";
import {UserCollectApi} from "@/apis/UserCollectApi";
import {UserCollectBean} from "@/beans/UserCollectBean";
import {LoginInfoBean} from "@/beans/LoginInfoBean";
import {LoginApi} from "@/apis/LoginApi";

@Component({
  name: 'TheArticle',
  components: {PaginationBase}
})
export default class TheArticle extends Vue {
  //data
  page: Page = Page.init();
  query: ArticleQueryParam = {};
  types: string[] = [];
  list: ArticleBean[] = [];
  loginInfo: LoginInfoBean = {};

  //mounted
  mounted() {
    this.loadInitData();
  }

  //methods
  async loadInitData() {
    this.types = await Request.run<string[]>(ArticleApi.GET_TYPE_LIST());
    await this.loadLoginInfo();
  }

  async loadLoginInfo() {
    const loginInfo = await Request.run<LoginInfoBean>(LoginApi.GET_LOGIN());
    this.loginInfo = loginInfo ?? {};
    await this.loadListData();
  }

  async loadListData() {
    Loading.start();
    const page = await Request
      .run<PageResultBean<ArticleBean>>(ArticleApi.GET_LIST({
        ...this.page,
        ...this.query,
      }))
      .finally(Loading.close);

    if (this.loginInfo.id) {
      for (let article of page.list) {
        const list = await this.isCollect(article);
        // @ts-ignore
        article.isCollect = list[0]?.id;
      }
    }

    this.page = Page.from(page);
    this.list = page.list;
  }

  async isCollect(article: ArticleBean) {
    if (!this.loginInfo.id) {
      return false;
    }
    const list = await Request.run<UserCollectBean[]>(UserCollectApi.GET_LIST({
      targetType: '文章',
      targetId: article.id,
    }));
    return list ?? [];
  }

  async collectClick(article: ArticleBean) {
    if (article.isCollect) {
      await Request
        .run(UserCollectApi.DELETE(article.isCollect as number))
    } else {
      await Request
        .run(UserCollectApi.POST({
          targetType: '文章',
          targetId: article.id,
        }));
    }
    await this.loadListData();
  }

  filterClick(key: string, value: string) {
    const query = this.query as any;
    if (query[key] === value) {
      query[key] = undefined;
    } else {
      query[key] = value;
    }
    this.loadListData();
  }

  detailClick(bean: ArticleBean) {
    this.$router.push(`/home/article/${bean.id}`)
  }

  onPageChange(current: number) {
    this.page.setCurrent(current);
    this.loadListData();
  }
}
</script>

<style lang="stylus" scoped>
.article {
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