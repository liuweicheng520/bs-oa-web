<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {CreateElement, RenderContext} from "vue";
  import {Page} from "@/components/pagination/Page";

  @Component({
    name: 'PaginationBase',
    functional: true,
  })
  export default class PaginationBase extends Vue {

    @Prop({
      required: true
    })
    public value!: Page;

    render(h: CreateElement, {props, listeners}: RenderContext) {
      return h('el-pagination', {
        class: 'pagination',
        props: {
          currentPage: props.value.current,
          pageSize: props.value.size,
          total: props.value.total,
          pageSizes: [10, 15, 20, 30, 50],
          layout: 'total, prev, pager, next, jumper',
        },
        on: {
          ...listeners,
          'current-change'(current: number) {
            props.value.setCurrent(current);
            (listeners as any)['input'](props.value);
            (listeners as any)['current-change'](current);
          }
        }
      });
    }
  }
</script>
<style lang="stylus" scoped>
    .pagination {
        margin 20px auto 50px auto
        text-align center
    }
</style>