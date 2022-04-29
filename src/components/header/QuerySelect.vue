<template>
    <el-col :span="span">
        <el-form-item class="query-input"
                      :prop="prop"
                      :value="value"
                      :label="label"
                      :rules="rules">

            <el-select
                    class="select"
                    :value="value"
                    size="small"
                    clearable
                    filterable
                    :filter-method="filterMethod"
                    @input="$listeners.input"
                    @change="onSearch">
                <el-option
                        v-for="item in filterOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-col>
</template>
<script lang="ts">
  import {Component, Inject, Prop, Vue, Watch} from 'vue-property-decorator';
  import Pinyin from "pinyin-match";

  interface Item {
    label: string;
    value: any;
  }

  @Component({
    name: 'QuerySelect',
  })
  export default class QuerySelect extends Vue {
    @Prop()
    public value!: any;

    @Prop({
      type: String,
    })
    public prop?: string;

    @Prop({
      type: Number,
      default: 6,
    })
    public span!: number;

    @Prop({
      type: String,
      required: true,
    })
    public label!: string;

    @Prop({
      type: Array,
    })
    public rules?: object[];

    @Prop({
      type: Array,
      required: true
    })
    public options!: Item[];

    @Inject('parent')
    public parent !: any;

    //data
    filterOptions: Item[] = [];

    @Watch('options')
    public optionsWatch(newVal: Item[]) {
      this.filterOptions = [...newVal];
    }

    //mounted
    mounted() {
      this.filterOptions = [...this.options];
    }

    //methods
    onSearch() {
      this.parent.searchClick();
    }

    filterMethod(key: string) {
      if (!key) {
        if (this.options) {
          this.filterOptions = [...this.options];
        }
        return;
      }
      this.filterOptions = this.options
        .map(item => {
          return {
            ...item,
            match: Pinyin.match(item.label, key)
          }
        })
        .filter(item => item.match)
        // @ts-ignore
        .sort((o1, o2) => o1.match[0] - o2.match[0]);
    }
  }
</script>

<style lang="stylus" scoped>
    .query-select {

    }

    .select {
        width 100%
    }
</style>