<template>
    <div class="article-detail">

        <div v-if="$util.isNotNull(article)" class="title">
            <h1 class="h1" v-text="article.articleName"></h1>
        </div>

        <div v-if="!article.videoUrl" class="content" v-html="article.html"></div>
        <div v-else v-html="article.videoUrl" style="text-align: center">
        </div>

        <div style="text-align: center">
            <el-button v-if="article.fileId" size="small" type="warning" @click="fileClick">附件下载</el-button>
        </div>

        <el-card class="mt-5" shadow="never">
            <div class="list">
                <el-row v-for="(discuss,index) in list" :key="discuss.id" class="cell" type="flex" align="middle">
                    <el-col :span="2">
                        <p class="avatar"
                           v-text="discuss.user.username.substring(0,2)"
                           :style="{backgroundColor:getColor(discuss)}"></p>
                    </el-col>
                    <el-col :span="20" class="content">
                        <div>
                            <p class="content" v-text="discuss.content"></p>
                            <div class="space"></div>
                            <p class="desc">
                                <strong class="mx-3">·</strong>
                                <strong class="mx-5" v-text="discuss.user.username"></strong>
                                <strong class="mx-3">·</strong>
                                <span class="mx-3">发布于</span>
                                <strong class="mx-5" v-text="discuss.createTime"></strong>
                                <el-button v-if="loginInfo.id === discuss.userId"
                                           type="text" icon="el-icon-delete"
                                           @click="deleteDiscussClick(discuss)"></el-button>
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <el-tag v-text="getNum(index)" type="warning" size="small" effect="dark"></el-tag>
                    </el-col>
                </el-row>
            </div>
            <pagination-base v-model="page" @current-change="onPageChange"></pagination-base>

        </el-card>

        <el-card class="mt-5">
            <div class="reply">
                <el-input v-model="param.content" type="textarea"
                          :autosize="{ minRows: 5 }"
                          placeholder="发表下自己的想法吧"></el-input>
                <el-button class="release-btn" type="danger" size="small"
                           @click="releaseClick" :disabled="!param.content">发布
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ArticleBean} from "@/beans/ArticleBean";
import {Request} from "@/plugins/Request";
import {ArticleApi} from "@/apis/ArticleApi";
import {Loading} from "@/plugins/Loading";
import {BbsDiscussQueryParam} from "@/params/query/BbsDiscussQueryParam";
import {Page} from "@/components/pagination/Page";
import {BbsDiscussBean} from "@/beans/BbsDiscussBean";
import {BbsDiscussParam} from "@/params/BbsDiscussParam";
import {LoginInfoBean} from "@/beans/LoginInfoBean";
import {LoginApi} from "@/apis/LoginApi";
import {PageResultBean} from "@/beans/base/PageResultBean";
import {SchoolBean} from "@/beans/SchoolBean";
import {BbsDiscussApi} from "@/apis/BbsDiscussApi";
import {BbsPostBean} from "@/beans/BbsPostBean";
import PaginationBase from "@/components/pagination/PaginationBase.vue";

const colors = [
  '#F44335',
  '#E91E62',
  '#2096F3',
  '#683BB6',
  '#FF9800',
  '#4BB04F',
];
@Component({
  name: 'TheArticleDetail',
  components: {PaginationBase}
})
export default class TheArticleDetail extends Vue {
  //data
  article: ArticleBean = {};
  query: BbsDiscussQueryParam = {};
  page: Page = Page.init();
  list: BbsDiscussBean[] = [];
  param: BbsDiscussParam = {};
  loginInfo: LoginInfoBean = {};

  get id() {
    const id = this.$route.params['id'];
    return Number.parseInt(id?.toString());
  }

  //mounted
  mounted() {
    this.loadLoginInfo();
    this.loadData();
  }

  //methods
  async loadLoginInfo() {
    const loginInfo = await Request.run<LoginInfoBean>(LoginApi.GET_LOGIN());
    this.loginInfo = loginInfo ?? {};
  }

  async loadData() {
    const article = await Request.run<ArticleBean>(ArticleApi.GET(this.id));
    if (article) {
      this.article = article;
    }
    if (this.article.videoUrl) {
      this.$message.warning('视频加载较慢，请稍等...');
      await this.handleIframe();
    }

    const page = await Request
      .run<PageResultBean<BbsDiscussBean>>(BbsDiscussApi.GET_PAGE({
        ...this.query,
        ...this.page,
        type: 'ARTICLE',
        bbsPostId: this.id
      }));

    this.page = Page.from(page);
    this.list = Page.list(page);
  }

  async deleteDiscussClick(bean: BbsDiscussBean) {
    await this.$confirm('是否删除?', '提示', {type: 'warning'});
    if (bean.id) {
      await Request.run(BbsDiscussApi.DELETE(bean.id));
      this.loadData();
    }
  }

  async releaseClick() {
    await Request
      .run<boolean>(BbsDiscussApi.CREATE({
        ...this.param,
        type: 'ARTICLE',
        bbsPostId: this.id,
      }));
    this.$router.go(0);
  }

  getNum(index: number) {
    const {size, total, current} = this.page;
    const num = total - ((current - 1) * size) - index;
    return '#' + num;
  }

  getColor(post: BbsPostBean) {
    return colors[post.userId! % colors.length];
  }

  onPageChange(current: number) {
    this.page.setCurrent(current);
    this.loadData();
  }

  fileClick() {
    window.open(`http://${location.host}/file/${this.article.fileId}`);
  }

  async handleIframe() {
    const width = 16 * 38;
    const height = 9 * 38;
    for (let i = 0; i < 3; i++) {
      await this.sleep(1000 * (i + 1));
      const iframes = document.getElementsByTagName('iframe');
      for (let item of iframes) {
        // @ts-ignore
        item.width = width;
        // @ts-ignore
        item.height = height;
        // @ts-ignore
        item.allowFullscreen = true;
      }
    }
  }

  sleep(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}
</script>

<style lang="stylus" scoped>
.article-detail {
  width 100%
  padding 20px
}

.title {
  width 100%
  text-align center

  .h1 {
    margin 20px
  }
}

.content {
  width 90%
  margin 20px auto
  overflow auto
}

.bbs-discuss {
  width 100%
  padding 0 20px
}

.header {
  margin 5px
}

.title {
  margin 20px 5px 0 5px
}

.cell {
  padding: 10px;
  font-size: 13px;
  line-height: 150%;
  background-color #fff
  border-bottom 1px solid #ccc
}

.avatar {
  width 50px
  height 50px
  text-align center
  line-height 50px
  background-color #3a8ee6
  color #fff
  border-radius 10%
  font-size 1.5em
  font-weight bold
}

.content {
  font-size 1.1em
  line-height 23px
}

.mr-5 {
  margin-right 5px
}

.space {
  height 5px
}

.desc {
  color #999
  margin 0 3px
  font-size 13px
}

.mx-3 {
  margin 0 3px
}

.mx-5 {
  margin 0 5px
}

.mt-5 {
  margin-top 15px
}

.reply {
  text-align right
}

.release-btn {
  margin-top 10px
}
</style>
