<template>
    <div class="register">
        <el-card class="register-container">
            <h3 class="title">注册</h3>

            <el-form ref="form" :model="user" :rules="rules" label-width="80px" size="small">
                <el-form-item label="用户名：" prop="username">
                    <el-input class="input" v-model.trim="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input class="input" v-model.trim="user.password" type="password"></el-input>
                </el-form-item>
            </el-form>

            <common-space :height="50"></common-space>

            <el-button class="register-btn" type="success"
                       :loading="loading" @click="registerClick">注册
            </el-button>
        </el-card>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {LoginApi} from "@/apis/LoginApi";
  import {UserBean} from "@/beans/UserBean";
  import {Request} from "@/plugins/Request";
  import {LoginRule} from "@/views/login/LoginRule";
  import {Valid} from "@/plugins/Valid";
  import {RoleEnum} from "@/enums/RoleEnum";
  import CommonSpace from "@/components/common/CommonSpace";

  @Component({
    name: 'TheRegister',
    components: {CommonSpace}
  })
  export default class TheRegister extends Vue {

    //data
    rules: object = LoginRule.buildRegisterRules(this);
    loading = false;
    user: UserBean = {};

    //
    mounted() {
    }

    //methods
    async registerClick() {
      await Valid.test(this);

      this.loading = true;
      const user = await Request
        .run<UserBean>(LoginApi.REGISTER({
          ...this.user,
          roleCode: RoleEnum.COMMON.name
        }))
        .finally(() => this.loading = false);
      if (user) {
        this.user = user;
        this.$message.success('注册成功');
        await this.$router.push('/login');
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .register {
        position relative
        width 100vw
        height 100vh
        background-size cover
        background-image url("../../assets/background.jpg")
    }

    .register-container {
        position absolute
        left 50%
        top 50%
        width w = 450px
        height h = 400px
        margin-top -(h / 2)
        margin-left -(w / 2)
        background-color rgba(255, 255, 255, .8)
    }

    .title {
        text-align center
        margin 25px
    }

    .input {
    }

    .register-btn {
        display block
        width 100%
    }
</style>