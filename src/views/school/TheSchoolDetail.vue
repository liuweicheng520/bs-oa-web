<template>
    <div class="school-detail">

        <el-card :body-style="{ padding: '5px' }">
            <div slot="header" class="clearfix">
                <span>协同过滤推荐</span>
            </div>
            <el-carousel height="35px" direction="vertical" autoplay>
                <el-carousel-item v-for="(arr,index) in list" :key="index">
                    <el-row type="flex" justify="space-between" align="middle">
                        <el-col v-for="item in arr" :key="item.id" :span="4"
                                style="text-align: center">
                            <el-tag v-text="item.schoolName"
                                    style="cursor: pointer"
                                    @click="$router.push('/home/school/'+item.id)"
                            ></el-tag>
                        </el-col>
                    </el-row>
                </el-carousel-item>
            </el-carousel>
        </el-card>

        <div style="height: 20px"></div>

        <el-card>
            <div slot="header" class="clearfix">
                <span v-text="school.schoolName"></span>
            </div>
            <el-tabs v-model="active" stretch style="background-color: white">
                <el-tab-pane v-for="tab of tabs" :key="tab.name"
                             :label="tab.label" :name="tab.name"
                             style="background-color:white;border-radius:5px;padding: 15px">
                    <div v-html="school[tab.name]" style="overflow: auto"></div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Request} from "@/plugins/Request";
import {SchoolApi} from "@/apis/SchoolApi";
import {SchoolBean} from "@/beans/SchoolBean";
import './school.css';
// @ts-ignore
import exec from "./school.js";

export interface Tab {
  label: string;
  name: string;
}

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
@Component({
  name: 'TheSchoolDetail',
})
export default class TheSchoolDetail extends Vue {
  //data
  tabs: Tab[] = [
    {label: '院校简介', name: 'introduce'},
    {label: '院系设置', name: 'college'},
    {label: '专业介绍', name: 'major'},
    {label: '录取规则', name: 'rule'},
    {label: '调剂政策', name: 'dispensing'},
  ];
  active: string = this.tabs[0].name;
  school: SchoolBean = {};
  list: SchoolBean[][] = [];

  get id() {
    const id = this.$route.params['id'];
    return Number.parseInt(id);
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    next();
    this.$router.go(0);
  }

  //mounted
  mounted() {
    this.loadSchool();
    this.loadRecommended();
  }

  //methods
  async loadRecommended() {
    this.list = await Request.run<SchoolBean[][]>(SchoolApi.GET_RECOMMENDED_LIST());
  }

  async loadSchool() {
    const school = await Request.run<SchoolBean>(SchoolApi.GET(this.id));
    this.school = school ?? {};
    setTimeout(exec, 1000);
  }
}
</script>

<style lang="stylus" scoped>
.school-detail {
  width 100%
  padding 0 20px
}

.el-carousel__item {
  background-color: #fff;
}

>>> .el-card__header {
  padding 8px 20px
}
</style>