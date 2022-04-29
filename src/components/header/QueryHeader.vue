<template>
    <div class="query-header el-card">
        <div class="header">
            <el-row type="flex" justify="space-around" align="middle">
                <el-col class="left" :span="18">
                    <slot name="operation"></slot>
                </el-col>
                <el-col class="right" :span="6">
                    <el-button
                            style="color:#32CDE5"
                            type="text"
                            icon="el-icon-search"
                            size="mini"
                            @click="searchClick">SEARCH
                    </el-button>
                    <el-button
                            style="color:#FF6A02"
                            type="text"
                            icon="el-icon-refresh-right"
                            size="mini"
                            @click="clearClick">CLEAR
                    </el-button>
                    <slot name="buttons"></slot>
                </el-col>
            </el-row>
        </div>
        <div class="body">
            <el-form ref="form" :model="value" label-width="120px">
                <slot></slot>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Provide, Vue} from 'vue-property-decorator';
  import {Page} from "@/components/pagination/Page";
  import {Valid} from "@/plugins/Valid";

  @Component({
    name: 'QueryHeader'
  })
  export default class QueryHeader extends Vue {
    @Prop({
      type: Object,
    })
    public value!: object;

    @Prop({
      type: Object,
    })
    public page?: Page;

    @Prop({
      type: Boolean,
      default: true
    })
    public init?: boolean;

    @Prop({
      type: Boolean,
      default: true
    })
    public changeRoute?: boolean;

    //data
    @Provide('parent')
    public parent = this;

    //mounted
    mounted() {
      const query = {...this.$route.query};
      this.$emit('input', query);
      if (this.init) {
        this.$emit('search', query);
      }
    }

    //methods
    searchClick() {
      // @ts-ignore
      Valid.test(this);
      const query: any = {};
      for (let key of Object.keys(this.value)) {
        const value = (this.value as any)[key];
        if (value) {
          query[key] = typeof value === 'string' ? value.trim() : value;
        }
      }
      if (this.page) {
        this.page.setCurrent(1);
      }

      this.$emit('input', query);
      this.$emit('search', query);

      this.changeRouteQuery(query);
    }

    clearClick() {
      Valid.reset(this);
      const query: any = {};
      for (let key of Object.keys(this.value)) {
        const value = (this.value as any)[key];
        if (value) {
          query[key] = undefined;
        }
      }
      if (this.page) {
        this.page.setCurrent(1);
      }

      this.$emit('input', query);
      this.$emit('search', query);
      this.$emit('clear');

      this.changeRouteQuery(query);
    }

    changeRouteQuery(query: any) {
      if (!this.changeRoute) {
        return;
      }
      if (JSON.stringify(query) === JSON.stringify(this.$route.query)) {
        return;
      }

      this.$router.replace({
        path: this.$route.path,
        query: query
      });
    }
  }
</script>

<style lang="stylus" scoped>
    .query-header {
        margin 20px 0
    }

    .header {
        padding 5px 20px
        border-bottom 1px solid #EBEEF5
        box-sizing border-box
    }

    .right {
        text-align right
    }

    .body {
        padding 10px 20px 0 10px
    }
</style>