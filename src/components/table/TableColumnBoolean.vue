<!--
<template>
    <el-table-column class="tc-boolean" :prop="prop" :label="label" align="center" width="50">
        <template #default="{row}">
            <i :class="row[prop]?'el-icon-check':'el-icon-close'"></i>
        </template>
    </el-table-column>
</template>
-->

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {CreateElement, RenderContext} from "vue";

  @Component({
    name: 'TableColumnBoolean',
    functional: true
  })
  export default class TableColumnBoolean extends Vue {
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

    //mounted
    mounted() {

    }

    //methods
    render(h: CreateElement, {props, listeners}: RenderContext) {
      return h('el-table-column', {
        props: {
          ...props,
          align: 'center',
          width: '50'
        },
        scopedSlots: {
          default({row}) {
            let className;
            if (row[props.prop]) {
              className = ['el-icon-check', 'green'];
            } else {
              className = ['el-icon-close', 'red'];
            }
            return h('i', {
              class: className
            });
          }
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
    .tc-boolean {

    }

    .green {
        color #5daf34
    }

    .red {
        color #ff4d51
    }
</style>