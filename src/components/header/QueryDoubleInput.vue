<template>
    <el-col :span="span">
        <el-form-item class="query-double-input"
                      :prop="prop"
                      :value="[value1,value2]"
                      :label="label"
                      :rules="rules">
            <el-row>
                <el-col :span="11">
                    <el-input
                            :value="value1"
                            size="small"
                            clearable
                            @input="val=>$emit('update:value1',val)"
                            @keydown.native.stop.enter="onSearch"
                            @clear="onClear"
                    ></el-input>
                </el-col>
                <el-col :span="2" class="split">-</el-col>
                <el-col :span="11">
                    <el-input
                            :value="value2"
                            size="small"
                            clearable
                            @input="val=>$emit('update:value2',val)"
                            @keydown.native.stop.enter="onSearch"
                            @clear="onClear"
                    ></el-input>
                </el-col>
            </el-row>
        </el-form-item>
    </el-col>
</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'QueryDoubleInput',
  })
  export default class QueryDoubleInput extends Vue {
    @Prop()
    public value1!: any;

    @Prop()
    public value2!: any;

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

    .split {
        text-align center
    }
</style>