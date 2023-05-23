<template>
  <div class="mainWrap">
    <div id="logo-title">
      <img src="../assets/Master-Logo.png" alt="logo" class="logo-title" />
    </div>

    <div id="registerWrap">
      <el-form
        ref="refForm"
        label-width="auto"
        auto-complete="on"
        :model="user"
      >
        <div id="register_header"><h1>倉儲管理系統</h1></div>

        <el-form-item
          prop="account"
          :rules="[{ required: true, trigger: 'submit' }]"
          :error="formError.account"
        >
          <el-input
            v-model="user.account"
            auto-complete="on"
            placeholder="帳號"
            tabindex="1"
            prefix-icon="el-icon-user"
            @blur="handleValidate('account')"
          />
        </el-form-item>

        <el-form-item
          prop="password"
          :rules="[{ required: true, trigger: 'submit' }]"
          :error="formError.password"
        >
          <el-input
            v-model="user.password"
            :type="passwordType"
            :key="passwordType"
            prefix-icon="el-icon-lock"
            placeholder="密碼"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="onLogin"
            @blur="handleValidate('password')"
          >
            <template slot="append">
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </template>
          </el-input>
        </el-form-item>

        <el-button
          :loading="loading"
          type="info"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="onLogin()"
        >
          登入
        </el-button>
        <div class="tips">
          <p class="version-span">前端版本 {{ version.frontEnd }}</p>
          <p class="version-span">後端版本 {{ version.backent }}</p>
          <p class="version-span" v-if="version.workStn != null">
            工作站點 {{ version.workStn }}
          </p>
        </div>
      </el-form>
    </div>

    <div id="logo">
      <img src="../assets/IA_LOGO_BIG.png" alt="logo" class="logo" />
      <p>Copyright © 2022 漢錸科技股份有限公司 All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import { validEmpty } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    return {
      formError: {
        account: "",
        password: "",
      },
      user: {
        account: "",
        password: "",
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  created() {
    this.version.workStn = "WORK_A";
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  computed: {
    version() {
      return {
        frontEnd: this.__version,
        backent: "",
        workStn: "",
      };
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    onLogin() {
      // 驗證
      const isValid = this.handleValidate();
      // 驗證完成
      if (isValid == true) {
        this.$store.dispatch("user/onLogin", this.user).then((resp) => {
          console.log(this.redirect);
          if (resp === true) {
            this.$router.push({ path: this.redirect || "/" });
          } else {
            
          }
        });
      }
    },
    handleValidate(field = "") {
      let isValid = true;
      this.formError = this.$options.data().formError;
      if (field == "account" && validEmpty(this.user.account) == true) {
        isValid = false;
        this.formError.account = "請輸入帳號";
      }

      if (field == "password" && validEmpty(this.user.password) == true) {
        isValid = false;
        this.formError.password = "請輸入密碼";
      }
      return isValid;
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
/*
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
*/
.version-span {
  color: #454545;
  margin: 3px;
}
// 容器
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.mainWrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(../assets/bg_main_1.png), url(../assets/bg_main_2.png),
    url(../assets/bg_circle_1.svg), url(../assets/bg_circle_2.svg);
  background-position: right top, left bottom, left 100px top 190px,
    right 20% bottom 180px;
  background-repeat: no-repeat;
  background-size: 60%, 60%, 140px 130px, 130px 130px;
  margin: 0;
}

#registerWrap {
  position: absolute;
  width: 480px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 10px #ccc;
  top: 28%;
  left: 28%;
  padding: 50px 40px;
  border-radius: 20px;
  z-index: 99999;
}

#register_header {
  background-size: 70px;
  width: 300px;
  top: 12%;
  left: 7%;
  margin-bottom: 30px;
}

#logo-title {
  position: absolute;
  top: 20px;
  left: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
#logo-title img {
  width: 300px;
}
#logo {
  position: absolute;
  bottom: 20px;
  right: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#logo img {
  width: 300px;
}

#logo p {
  color: #334750;
  font-size: 16px;
  line-height: 40px;
}
.el-button-login {
  background-color: #454545;
}
@media screen and (min-width: 1440px) {
  #mainWrap {
    background-image: url(../assets/bg_main_1.png), url(../assets/bg_main_2.png),
      url(../assets/bg_circle_1.svg), url(../assets/bg_circle_2.svg);
    background-position: right top, left bottom, left 100px top 190px,
      right 470px bottom 180px;
    background-repeat: no-repeat;
    background-size: 60%, 60%, 140px 130px, 130px 130px;
    margin: 0;
  }

  #registerWrap {
    top: 300px;
    left: 580px;
    background-color: #fff;
  }
}
</style>
