<template>
    <dialog-base class="question-edit"
                 title="题目"
                 :type="type"
                 @submit="onSubmit">

        <el-form class="form" ref="form" :model="question" :rules="rules" label-width="120px" size="small">
            <el-form-item label="问题题目：" prop="questionTitle">
                <el-input class="input" v-model.trim="question.questionTitle"></el-input>
            </el-form-item>
            <el-form-item label="正确答案：" prop="rightAnswer">
                <input-list v-model="question.rightAnswer"></input-list>
            </el-form-item>
            <el-form-item label="错误答案：" prop="errorAnswer">
                <input-list v-model="question.errorAnswer"></input-list>
            </el-form-item>
        </el-form>
    </dialog-base>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from "vue-property-decorator";
import InputFile from "@/components/input/InputFile.vue";
import DialogBase from "@/components/dialog/DialogBase.vue";
import {quillEditor} from "vue-quill-editor";
import QuestionEditRules from "@/views/question/dialog/QuestionEditRules";
import {EnumItem} from "@/enums/base/Enum";
import {QuestionBean} from "@/beans/QuestionBean";
import {DialogType} from "@/components/dialog/DialogType";
import {Request} from "@/plugins/Request";
import {QuestionApi} from "@/apis/QuestionApi";
import {SubmitCallback} from "@/components/dialog/SubmitCallback";
import {Valid} from "@/plugins/Valid";
import InputList from "@/components/input/InputList.vue";

@Component({
  name: 'QuestionEditDialog',
  components: {InputList, InputFile, DialogBase, quillEditor}
})
export default class QuestionEditDialog extends Mixins(QuestionEditRules) {

  @Prop({
    type: Object,
    required: true
  })
  public type!: EnumItem;
  @Prop({
    type: Number,
  })
  public id?: number;
  @Prop({
    type: Number,
  })
  public groupId?: number;

  //data
  question: QuestionBean = {
    rightAnswer: [],
    errorAnswer: []
  };
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
    const question = await Request.run<QuestionBean>(QuestionApi.GET(this.id));
    if (!question) {
      this.$message.error('不存在');
      return;
    }
    this.question = question;
  }

  async onSubmit(cb: SubmitCallback) {
    let rest;
    if (this.type === DialogType.EDIT && this.id) {
      rest = QuestionApi.PUT(this.id, {
        ...this.question,
      });
    } else {
      rest = QuestionApi.POST({
        ...this.question,
        questionGroupId: this.groupId,
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
.form {
  width 90%
  margin auto
}

</style>