<template>
    <dialog-base class="article-preview"
                 title="文章预览"
                 @submit="onSubmit">
        <div class="content" v-html="article.html"></div>
    </dialog-base>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {ArticleBean} from "@/beans/ArticleBean";
  import {Request} from "@/plugins/Request";
  import {ArticleApi} from "@/apis/ArticleApi";
  import DialogBase from "@/components/dialog/DialogBase.vue";
  import {SubmitCallback} from "@/components/dialog/SubmitCallback";

  @Component({
    name: 'ArticlePreviewDialog',
    components: {DialogBase}
  })
  export default class ArticlePreviewDialog extends Vue {

    @Prop({
      type: Number,
      required: true
    })
    public articleId!: number;

    //data
    article: ArticleBean = {};

    //mounted
    mounted() {
      this.loadBeanData();
    }

    //methods
    async loadBeanData() {
      const article = await Request.run<ArticleBean>(ArticleApi.GET(this.articleId));
      if (!article) {
        this.$message.error('文章不存在');
        return;
      }
      this.article = article;
    }

    onSubmit(cb: SubmitCallback) {
      cb.submit();
    }
  }
</script>

<style lang="stylus" scoped>
    .article-preview {

    }

    .content {
        width 100%
        margin auto
        overflow auto
    }
</style>