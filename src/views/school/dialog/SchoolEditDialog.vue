<template>
    <dialog-base class="school-edit"
                 title="院校"
                 :type="type"
                 @submit="onSubmit">

        <el-form class="form" ref="form" :model="school" :rules="rules" label-width="180px" size="small">
            <el-form-item label="院校姓名：" prop="schoolName">
                <el-input class="input" v-model.trim="school.schoolName"></el-input>
            </el-form-item>
            <el-form-item label="地区：" prop="area">
                <el-input class="input" v-model.trim="school.area"></el-input>
            </el-form-item>
            <el-form-item label="隶属：" prop="belong">
                <el-input class="input" v-model.trim="school.belong"></el-input>
            </el-form-item>
            <el-form-item label="特性 研究生院：" prop="featureYjs">
                <el-checkbox v-model="school.featureYjs"></el-checkbox>
            </el-form-item>
            <el-form-item label="特性 自划线：" prop="featureZhx">
                <el-checkbox v-model="school.featureZhx"></el-checkbox>
            </el-form-item>
            <el-form-item label="最低录取分：" prop="featureZhx">
                <el-input type="number" v-model="school.info['最低录取分']"></el-input>
            </el-form-item>
            <el-form-item label="学校总人数：" prop="featureZhx">
                <el-input type="number" v-model="school.info['学校总人数']"></el-input>
            </el-form-item>
            <el-form-item label="往期人数：" prop="featureZhx">
                <el-input type="number" v-model="school.info['往期人数']"></el-input>
            </el-form-item>
            <el-form-item label="男生人数：" prop="featureZhx">
                <el-input type="number" v-model="school.info['男生人数']"></el-input>
            </el-form-item>
            <el-form-item label="女生人数：" prop="featureZhx">
                <el-input type="number" v-model="school.info['女生人数']"></el-input>
            </el-form-item>
            <el-tabs tab-position="left" style="height: 600px;">
                <el-tab-pane label="院校简介">
                    <quill-editor class="editor" v-model.trim="school.introduce" :options="{}"></quill-editor>
                </el-tab-pane>
                <el-tab-pane label="院系设置">
                    <quill-editor class="editor" v-model.trim="school.college" :options="{}"></quill-editor>
                </el-tab-pane>
                <el-tab-pane label="专业介绍">
                    <quill-editor class="editor" v-model.trim="school.major" :options="{}"></quill-editor>
                </el-tab-pane>
                <el-tab-pane label="录取规则">
                    <quill-editor class="editor" v-model.trim="school.rule" :options="{}"></quill-editor>
                </el-tab-pane>
                <el-tab-pane label="调剂政策">
                    <quill-editor class="editor" v-model.trim="school.dispensing" :options="{}"></quill-editor>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </dialog-base>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import DialogBase from "@/components/dialog/DialogBase.vue";
import {EnumItem} from "@/enums/base/Enum";
import {DialogType} from "@/components/dialog/DialogType";
import {Request} from "@/plugins/Request";
import {SubmitCallback} from "@/components/dialog/SubmitCallback";
import {Valid} from "@/plugins/Valid";
import {SchoolBean} from "@/beans/SchoolBean";
import {SchoolApi} from "@/apis/SchoolApi";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// @ts-ignore
import {quillEditor} from 'vue-quill-editor'
import SchoolRules from "@/views/school/dialog/SchoolRules";

@Component({
  name: 'SchoolEditDialog',
  components: {DialogBase, quillEditor}
})
export default class SchoolEditDialog extends Vue {
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
  rules = SchoolRules;
  school: SchoolBean = {
    info: {
      '最低录取分': '',
      '学校总人数': '',
      '往期人数': '',
      '男生人数': '',
      '女生人数': '',
    }
  };

  //mounted
  mounted() {
    if (this.type === DialogType.EDIT) {
      this.load();
    }
  }

  //methods
  async load() {
    if (!this.id) {
      return;
    }
    const school = await Request.run<SchoolBean>(SchoolApi.GET(this.id));
    if (!school) {
      this.$message.error('不存在');
      return;
    }
    this.school = school;
  }

  async onSubmit(cb: SubmitCallback) {
    let rest;
    if (this.type === DialogType.EDIT && this.id) {
      rest = SchoolApi.MODIFY(this.id, {
        ...this.school,
      });
    } else {
      rest = SchoolApi.CREATE({
        ...this.school,
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
.school-edit {

}

.editor {
  max-height 600px
  overflow auto
}
</style>