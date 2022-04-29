<template>
    <el-table-column class="tc-time" :prop="prop" :label="_label" align="center" width="100">
        <template #default="{row}">
            <span class="text" v-text="row[prop].split(' ')[0]"></span>
            <br>
            <span class="text" v-text="row[prop].split(' ')[1]"></span>
        </template>
    </el-table-column>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'TableColumnTime'
  })
  export default class TableColumnTime extends Vue {
    @Prop({
      type: String,
      required: true
    })
    public prop!: string;

    @Prop({
      type: String,
    })
    public label?: string;

    //data
    get _label() {
      if (this.prop === 'createTime') {
        return '创建时间';
      } else if (this.prop === 'updateTime') {
        return '更新时间';
      } else {
        return this.label;
      }
    }

    //mounted
    mounted() {

    }

    //methods

  }
</script>

<style lang="stylus" scoped>
    .tc-time {

    }

    .text {
        font-size .8em
    }
</style>