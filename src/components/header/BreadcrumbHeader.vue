<template>
    <div class="breadcrumb-header">
        <div class="header">
            <el-breadcrumb>
                <el-breadcrumb-item v-for="item in items" :key="item">
                    <span v-text="item"></span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'BreadcrumbHeader'
  })
  export default class BreadcrumbHeader extends Vue {
    @Prop({
      type: Array,
      required: true
    })
    public items!: string[];
    //data

    //mounted
    mounted() {

    }

    //methods

  }
</script>

<style lang="stylus" scoped>
    .breadcrumb-header {
        margin 20px
    }
</style>