<template>
    <el-col :span="span">
        <el-form-item class="query-checkbox"
                      :prop="prop"
                      :value="value"
                      :label="label"
                      :rules="rules">
            <el-checkbox
                    :value="value"
                    @input="$listeners.input"
                    @change="onSearch"
            ></el-checkbox>
        </el-form-item>
    </el-col>
</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'QueryCheckbox'
  })
  export default class QueryCheckbox extends Vue {
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

    @Inject('parent')
    public parent !: any;
    //data

    //methods
    onSearch() {
      this.parent.searchClick();
    }
  }
</script>

<style lang="stylus" scoped>
    .query-checkbox {

    }
</style>