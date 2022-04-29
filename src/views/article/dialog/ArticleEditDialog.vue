<template>
    <dialog-base class="article-edit"
                 title="文章"
                 :type="type"
                 @submit="onSubmit">

        <el-form class="form" ref="form" :model="article" :rules="rules" label-width="120px" size="small">
            <el-form-item label="名称：" prop="articleName">
                <el-input class="input" v-model.trim="article.articleName"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="articleType">
                <el-checkbox v-model="isVideo" @change="onVideoChange">视频</el-checkbox>
                <el-input v-if="!isVideo" class="input" v-model.trim="article.articleType"></el-input>
            </el-form-item>
            <template v-if="isVideo">
                <el-form-item label="视频地址：" prop="articleName">
                    <el-input class="input" v-model.trim="article.videoUrl"></el-input>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="附件：" prop="file">
                    <input-file v-model="article.fileId"></input-file>
                </el-form-item>
                <quill-editor v-model="article.html"
                              ref="myQuillEditor"
                              :options="{}">
                </quill-editor>
            </template>
        </el-form>
    </dialog-base>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import DialogBase from "@/components/dialog/DialogBase.vue";
import {EnumItem} from "@/enums/base/Enum";
import {ArticleBean} from "@/beans/ArticleBean";
import {Request} from "@/plugins/Request";
import {ArticleApi} from "@/apis/ArticleApi";
import {SubmitCallback} from "@/components/dialog/SubmitCallback";
import {DialogType} from "@/components/dialog/DialogType";
import {Valid} from "@/plugins/Valid";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// @ts-ignore
import {quillEditor} from 'vue-quill-editor'
import ArticleEditRules from "@/views/article/dialog/ArticleEditRules";
import InputFile from "@/components/input/InputFile.vue";

@Component({
  name: 'ArticleEditDialog',
  components: {InputFile, DialogBase, quillEditor}
})
export default class ArticleEditDialog extends Mixins(ArticleEditRules) {

  @Prop({
    type: Object,
    required: true
  })
  public type!: EnumItem;
  @Prop({
    type: Number,
  })
  public id?: number;

  //data
  article: ArticleBean = {};
  isVideo = false;

  //mounted
  mounted() {
    if (this.type === DialogType.EDIT) {
      this.loadBeanData();
    }
  }

  //methods
  async loadBeanData() {
    if (!this.id) {
      return;
    }
    const article = await Request.run<ArticleBean>(ArticleApi.GET(this.id));
    if (!article) {
      this.$message.error('文章不存在');
      return;
    }
    this.article = article;
    this.isVideo = article.articleType === '视频';
  }

  onVideoChange(val: boolean) {
    if (val) {
      this.article.articleType = '视频';
    } else {
      this.article.articleType = '';
    }
  }

  async onSubmit(cb: SubmitCallback) {
    let rest;
    if (this.type === DialogType.EDIT && this.id) {
      rest = ArticleApi.MODIFY(this.id, {
        ...this.article,
      });
    } else {
      rest = ArticleApi.CREATE({
        ...this.article,
      });
    }
    await Valid.test(this);

    cb.start();
    const state = await Request.run<boolean>(rest).finally(
      () => cb.close()
    );

    state && cb.submit();
  }
}
</script>

<style lang="stylus" scoped>
.article-edit {

}

.form {
  width 90%
  margin auto
}

iframe {
    width 1600px
}
</style>