<template>
    <div class="table-expand-info">
        <el-form-item v-for="key in Object.keys(info || {})" :key="key" :label="key">
            <span v-if="info[key].length<50" v-html="info[key]"></span>
            <el-button v-else type="text" @click="detailClick(key,info[key])">点击查看详情</el-button>
        </el-form-item>

        <el-drawer
                size="50%"
                :title="drawer.title"
                :visible.sync="drawer.visible"
                direction="rtl"
                :before-close="onClose"
                append-to-body
                destroy-on-close>
            <div class="content" v-html="drawer.content"></div>
        </el-drawer>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  interface Drawer {
    visible: boolean;
    title?: string;
    content?: string;
  }

  @Component({
    name: 'TableExpandInfo'
  })
  export default class TableExpandInfo extends Vue {
    @Prop({
      required: true
    })
    public info?: object;
    //data
    drawer: Drawer = {
      visible: false
    };

    //mounted
    mounted() {

    }

    //methods
    detailClick(key: string, value: string) {
      this.drawer = {
        visible: true,
        title: key,
        content: value
      }
    }

    onClose(done: Function) {
      this.drawer = {
        visible: false
      };
      done();
    }
  }
</script>

<style lang="stylus" scoped>
    .table-expand-info {

    }

    .content {
        padding 20px
    }
</style>