<template>
    <el-row type="flex" justify="left">
        <el-col v-if="value" :span="5">
            <el-button type="text" @click="downloadClick">点击下载</el-button>
        </el-col>
        <el-col>
            <el-upload
                    class="input-file"
                    :action="`${baseUrl}/file`"
                    multiple
                    :limit="1"
                    :file-list="fileList"
                    :on-success="onSuccess"
                    with-credentials>
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'InputFile'
  })
  export default class InputFile extends Vue {
    @Prop({})
    public value?: number;

    //data
    baseUrl = `http://${location.host}/`;
    fileList = [];

    //mounted
    mounted() {
    }

    //methods
    downloadClick() {
      window.open(`${this.baseUrl}/file/${this.value}`);
    }

    onSuccess(res: any) {
      this.$emit('input', res.data.id);
    }
  }
</script>

<style lang="stylus" scoped>
    .input-file {

    }
</style>
