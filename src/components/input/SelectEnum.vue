<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {CreateElement, RenderContext} from "vue";
  import {EnumItem} from "@/enums/base/Enum";

  @Component({
    name: 'SelectEnum',
  })
  export default class SelectEnum extends Vue {
    //data
    @Prop({
      type: [String, Number]
    })
    public value!: String | Number;
    @Prop({
      type: Array,
      required: true
    })
    public options!: EnumItem[];

    //mounted
    mounted() {

    }

    //methods
    render(h: CreateElement) {
      return h('el-select', {
          props: {
            ...this.$props,
            value: this.value,
          },
          attrs: this.$attrs,
          on: this.$listeners
        },
        this.options.map((item: EnumItem) => {
          return h('el-option', {
            props: {
              label: item.message,
              value: item.name
            }
          })
        })
      )
    }
  }
</script>