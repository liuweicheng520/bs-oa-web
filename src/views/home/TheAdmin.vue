<template>
    <div class="admin">
        <el-row class="toolbar" type="flex" align="middle">
            <el-col :span="18">
                <el-menu
                        class="menu"
                        :default-active="active"
                        mode="horizontal"
                        background-color="#1470CC"
                        text-color="#fff"
                        active-text-color="#99D8F1"
                        router>
                    <el-menu-item v-for="(menu,index) in menus"
                                  :key="index"
                                  :index="menu.path"
                                  :route="menu.path">
                        <span v-text="menu.title"></span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col class="operating" :span="6">
                <span class="username">Welcome</span>
                <el-button type="text" size="mini" style="color: #99D8F1" @click="logoutClick">登出</el-button>
            </el-col>
        </el-row>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {LoginInfoBean} from "@/beans/LoginInfoBean";
  import {Route} from "vue-router";
  import {LoginApi} from "@/apis/LoginApi";
  import {Request} from "@/plugins/Request";

  export interface Menu {
    title: string;
    path: string;
    children?: RegExp[];
  }

  const menus: Menu[] = [
    {
      title: '待办事项管理',
      path: '/admin/handleAffairs',
    },
    // {
    //   title: '
    //   考研文库管理',
    //   path: '/admin/article',
    // },
    // {
    //   title: '课程管理',
    //   path: '/admin/course',
    // },
    // {
    //   title: '用户管理',
    //   path: '/admin/user',
    // },
    // {
    //   title: '试卷管理',
    //   path: '/admin/question',
    //   children: [/^\/admin\/question\/((?:[^\/]+?))(?:\/(?=$))?$/i]
    // },
  ];

  @Component({
    name: 'TheAdmin',
  })
  export default class TheAdmin extends Vue {
    //data
    active: string = menus[0].path;
    loginInfo: LoginInfoBean = {};

    @Watch('$route', {immediate: true})
    private changeRouter(route: Route) {
      this.findActive();
    }

    get menus(): Menu[] {
      return menus;
    }

    //mounted
    mounted() {
      this.findActive();
      this.loadLoginInfo();
    }

    //methods
    findActive() {
      const path = this.$route.path;
      for (let i = 0; i < this.menus.length; i++) {
        const menu = this.menus[i];
        if (menu.path === path) {
          this.active = menu.path;
          return;
        }
        if (!menu.children) {
          continue;
        }

        for (let reg of menu.children) {
          if (reg.test(path)) {
            this.active = menu.path;
            return;
          }
        }
      }
      this.$router.push(this.menus[0].path);
    }

   async  loadLoginInfo() {
      const loginInfo = await Request.run<LoginInfoBean>(LoginApi.GET_LOGIN());
      if (!loginInfo) {
        await   this.$router.push('/login');
        return;
      }
      this.loginInfo = loginInfo;
      console.info(loginInfo)
      this.findActive();
    }

    async logoutClick() {
      await Request.run(LoginApi.LOGOUT());
      await this.$router.go(0);
    }

  }
</script>

<style lang="stylus" scoped>
    .admin {

    }

    .toolbar {
        background-color #1470CC
    }

    .menu {
        border-bottom none
    }

    .operating {
        align-content center
        color #fff
        line-height 60px
        padding-right 20px
        text-align right

        .username {
            margin 10px 20px
        }
    }
</style>
