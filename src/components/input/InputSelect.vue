<template>
    <el-select
            class="select"
            :value="value"
            size="small"
            clearable
            filterable
            :filter-method="filterMethod"
            @input="val=>$emit('input',val)"
            @change="val=>$emit('change',val)">
        <el-option
                v-for="item in filterOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>
<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import Pinyin from "pinyin-match";

  interface Item {
    label: string;
    value: any;
  }

  @Component({
    name: 'InputSelect',
  })
  export default class InputSelect extends Vue {
    @Prop({
      type: [String, Number]
    })
    public value!: String | Number;
    @Prop({
      type: Array,
      required: true
    })
    public options!: Item[];

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