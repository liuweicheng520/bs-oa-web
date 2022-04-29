<template>
    <div class="home-menu">

        <div class="user-container">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                       :size="120"></el-avatar>

            <div v-if="$util.isNull(loginInfo)">
                <el-button type="text" @click="$router.push('/login')">请登录</el-button>
            </div>
            <div v-else>
                <p>欢迎 <span v-text="loginInfo.username"></span></p>
                <common-space :height="20"></common-space>
                <el-button size="mini" @click="logoutClick">退出登录</el-button>
            </div>
        </div>

        <div class="menus">
            <ul>
                <li v-for="menu in menus"
                    :key="menu.title"
                    :class="(active===menu)?'active':'inactive'"
                    @click="menuClick(menu)">
                    <i :class="menu.icon"></i>
                    <span style="margin-left: 10px" v-text="menu.title"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {LoginInfoBean} from "@/beans/LoginInfoBean";
  import {Request} from "@/plugins/Request";
  import {LoginApi} from "@/apis/LoginApi";
  import CommonSpace from "@/components/common/CommonSpace";
  import {Route} from "vue-router";

  export interface Menu {
    icon: string;
    title: string;
    path: string;
    children?: RegExp[];
  }

  const menus: Menu[] = [
    {
      icon: 'el-icon-school',
      title: '院校大全',
      path: '/home/school',
      children: [/^\/home\/school\/((?:[^\/]+?))(?:\/(?=$))?$/i]
    },
    // {
    //   icon: 'el-icon-pie-chart',
    //   title: '院校统计',
    //   path: '/home/statistics'
    // },
    // {
    //   icon: 'el-icon-document',
    //   title: '考研文库',
    //   path: '/home/article',
    //   children: [/^\/home\/article\/((?:[^\/]+?))(?:\/(?=$))?$/i]
    // },
    // {
    //   icon: 'el-icon-reading',
    //   title: '考研题库',
    //   path: '/home/question',
    //   children: [/^\/home\/question\/((?:[^\/]+?))(?:\/(?=$))?$/i]
    // },
    // {
    //   icon: 'el-icon-tickets',
    //   title: '辅助答疑',
    //   path: '/home/course',
    //   children: [/^\/home\/course\/((?:[^\/]+?))(?:\/(?=$))?$/i]
    // },
    {
      icon: 'el-icon-guide',
      title: '考研论坛',
      path: '/home/bbs',
      children: [/^\/home\/bbs\/((?:[^\/]+?))(?:\/(?=$))?$/i]
    },
    {
      icon: 'el-icon-star-off',
      title: '我的收藏',
      path: '/home/collect',
    },
  ];

  @Component({
    name: 'HomeMenu',
    components: {CommonSpace},
  })
  export default class HomeMenu extends Vue {
    //data
    loginInfo: LoginInfoBean = {};
    menus: Menu[] = menus;
    active: Menu = menus[0];

    //mounted
    @Watch('$route', {immediate: true})
    private changeRouter(route: Route) {
      this.findActive();
    }

    mounted() {
      this.findActive();
      this.loadLoginInfo();
    }

    //methods
    findActive() {
      const path = this.$route.path;

      for (let menu of this.menus) {
        if (menu.path === path) {
          this.active = menu;
          return;
        }
        if (!menu.children) {
          continue;
        }
        for (let reg of menu.children) {
          if (reg.test(path)) {
            this.active = menu;
            return;
          }
        }
      }
      this.$router.replace(this.menus[0].path);
    }

    async loadLoginInfo() {
      const loginInfo = await Request.run<LoginInfoBean>(LoginApi.GET_LOGIN());
      this.loginInfo = loginInfo ?? {};
    }

    async logoutClick() {
      await Request.run(LoginApi.LOGOUT());
      await this.$router.go(0);
    }

    menuClick(menu: Menu) {
      this.active = menu;
      if (this.$route.path !== menu.path) {
        this.$router.push(menu.path);
      }
    }

  }
</script>

<style lang="stylus" scoped>
    .home-menu {
        background-color #fff
        min-height 500px
    }

    .user-container {
        padding 30px 0
        text-align center
        background-color antiquewhite
    }

    .menus {
        margin-top 30px

        ul {
            list-style none
        }

        li {
            height h = 35px
            line-height h
            text-align center
            border-radius 3px
            color #333
            margin 10px auto
            cursor pointer
        }

        .active {
            background-color #039A61
            color #fff

            &:hover {
            }
        }

        .inactive {
            &:hover {
                background-color #EEF7F3
            }
        }
    }
</style>
