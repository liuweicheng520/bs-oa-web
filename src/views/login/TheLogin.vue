<template>
  <div class="login">
    <el-card class="login-container">
      <h3 class="title">登录</h3>
      <el-input class="input" v-model="loginInfo.username" placeholder="用户名"></el-input>
      <el-input class="input" v-model="loginInfo.password" type="password" placeholder="密码"></el-input>
      <!--            <el-row type="flex" justify="space-between" align="center">-->
      <!--                <el-col :span="12">-->
      <!--                    <el-image class="captcha" :src="base64" v-loading="!base64" @click="load"></el-image>-->
      <!--                </el-col>-->
      <!--                <el-col :span="12">-->
      <!--                    <el-input class="input" v-model="loginInfo.captcha" placeholder="验证码"></el-input>-->
      <!--                </el-col>-->
      <!--            </el-row>-->
      <common-space :height="30"></common-space>

      <el-button class="login-btn" type="danger" :loading="loading" @click="loginClick">登录</el-button>
      <el-button class="register-btn" type="text" @click="registerClick">注册</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {LoginApi} from "@/apis/LoginApi";
import {Request} from "@/plugins/Request";
import {LoginInfoBean} from "@/beans/LoginInfoBean";
import {RoleEnum} from "@/enums/RoleEnum";
import {Enum} from "@/enums/base/Enum";
import CommonSpace from "@/components/common/CommonSpace";
// import {CaptchaBean} from "@/beans/CaptchaBean";
import {LoginInfoParam} from "@/params/LoginInfoParam";

@Component({
  name: 'TheLogin',
  components: {CommonSpace},
})
export default class TheLogin extends Vue {
  //data
  loading = false;
  loginInfo: LoginInfoParam = {};
  base64: String = '';

  //mounted
  mounted() {
    // this.load();
  }

  // //methods
  // async load() {
  //   const bean = await Request.run<CaptchaBean>(
  //     LoginApi.GET_CAPTCHA()
  //   );
  //   this.base64 = 'data:image/png;base64,' + bean.base64 ?? '';
  // }

 async loginClick() {
    this.loading = true;
    const loginInfo =await Request
        .run<LoginInfoBean>(LoginApi.LOGIN({
          ...this.loginInfo
        }))
        .finally(() => this.loading = false);

    console.info(loginInfo);
  await this.$router.push('/admin');
  }

  async registerClick() {
    await this.$router.push('/register');
  }
}
</script>

<style lang="stylus" scoped>
.login {
  position relative
  width 100vw
  height 100vh
  background-size cover
  background-image url("../../assets/background.jpg")
}

.login-container {
  position absolute
  right 5%
  top 50%
  width w = 350px
  height h = 420px
  margin-top -(h / 2)
  background-color rgba(255, 255, 255, .8)
}

.title {
  text-align center
  margin 25px
}

.captcha {
  height 60px
}

.input {
  margin 10px auto
}

.login-btn {
  display block
  width 100%
}

.register-btn {
  display block
  margin auto
}
</style>
