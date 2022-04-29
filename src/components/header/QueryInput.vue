<template>
    <el-col :span="span">
        <el-form-item class="query-input"
                      :prop="prop"
                      :value="value"
                      :label="label"
                      :rules="rules">
            <el-input
                    :value="value"
                    size="small"
                    clearable
                    @input="$listeners.input"
                    @keydown.native.stop.enter="onSearch"
                    @clear="onClear"
            ></el-input>
        </el-form-item>
    </el-col>
</template>

<script lang="ts">
  import {Component, Inject, Prop, Provide, Vue} from 'vue-property-decorator';

  @Component({
    name: 'QueryInput',
  })
  export default class QueryInput extends Vue {
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

    //mounted
    mounted() {

    }

    onSearch() {
      this.parent.searchClick();
    }

    onClear() {
      this.parent.searchClick();
    }
  }
</script>

<style lang="stylus" scoped>
    .query-input {

    }
</style>