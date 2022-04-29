<template>
    <div class="input-tabs-info">
        <div v-if="!value || !Object.keys(value).length" class="tips">
            <el-button type="text" @click="addClick">新增项目</el-button>
        </div>
        <el-tabs v-else v-model="activeName" type="card" editable @edit="onTabsEdit">

            <el-tab-pane
                    v-for="key in Object.keys(value || {})"
                    :key="key"
                    :label="key"
                    :name="key"
            >
                <html-editor v-model="value[key]"></html-editor>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import HtmlEditor from "@/components/editor/HtmlEditor/HtmlEditor";

  @Component({
    name: 'InputTabsInfo',
    components: {HtmlEditor}
  })
  export default class InputTabsInfo extends Vue {
    @Prop({
      type: Object
    })
    public value!: object;

    //data
    activeName = '';

    //mounted
    mounted() {
    }

    //methods
    onTabsEdit(targetName: string, action: string) {
      if (action === 'add') {
        this.addClick();
      } else if (action === 'remove') {
        this.removeClick(targetName);
      }
    }

    async addClick() {
      const {value} = await this.$prompt('请输入项目标题', '提示') as { value: '' };
      const info = (this.value ? {...this.value} : {}) as any;
      if (info[value] !== undefined) {
        this.$message.error('不可重复添加');
        return;
      }
      this.$set(info, value, '');
      this.$emit('input', info);
      this.activeName = value;
    }

    removeClick(targetName: string) {
      const info = (this.value ? {...this.value} : {}) as any;
      this.$delete(info, targetName);
      this.$emit('input', info);

      const keys = Object.keys(info);
      if (keys.length) {
        this.activeName = keys[0];
      } else {
        this.activeName = '';
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .input-tabs-info {

    }

    .tips {
        text-align center
    }
</style>