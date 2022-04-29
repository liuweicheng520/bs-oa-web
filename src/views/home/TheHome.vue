<template>
    <div class="home">

        <el-container class="container">
            <div class="header">
                <div class="cover"></div>
            </div>
            <el-aside width="200px">
                <home-menu></home-menu>
            </el-aside>
            <el-container>
                <router-view/>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HomeMenu from "@/views/home/menu/HomeMenu.vue";
  import {Request} from "@/plugins/Request";
  import {LoginInfoBean} from "@/beans/LoginInfoBean";
  import {LoginApi} from "@/apis/LoginApi";

  @Component({
    name: 'TheHome',
    components: {HomeMenu}
  })
  export default class TheHome extends Vue {
    //data

    //mounted
    async mounted() {
    }

  }
</script>

<style lang="stylus" scoped>
    .home {
        min-height calc(100vh + 300px)
    }

    .container {
        position relative
        width 1150px
        margin auto
        padding 50px
    }

    .header {
        position absolute
        top 0
        left 0
        width 100%
        z-index -999
        height 550px
        background-image url("../../assets/toolbar.jpg")
        background-size cover
        background-position center
    }

    .cover {
        position absolute
        top 0
        left 0
        z-index 1
        width 100%
        height 100%
        background-image linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, #ffffff 100%)
    }
</style>