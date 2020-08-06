<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" :model="formObj" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{title}}</h3>
      </div>
      <el-form-item prop="username">
        <i class="icon el-icon-user"></i>
        <el-input v-model="formObj.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <i class="icon el-icon-lock"></i>
        <el-input
          type="password"
          v-model="formObj.password"
          @keyup.enter.native="handleLogin"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formObj.loginType">
          <el-radio label="merchant">商家</el-radio>
          <el-radio label="admin">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button
        :loading="loading"
        class="submit-btn"
        type="primary"
        @click="handleLogin"
      >{{loading ? '登录中' : '登录'}}</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { mapActions } from "vuex";
const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback("请输入正确的用户名");
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback("密码不能少于6个字符");
  } else {
    callback();
  }
};
export default {
  name: "Login",
  data() {
    return {
      title: process.env.VUE_APP_BASE_TITLE,
      formObj: {
        username: "",
        password: "",
        loginType: "admin", // 默认商家端
      },
      loading: false,
      loginRules: {
        username: [{ required: true, validator: validateUsername }],
        password: [{ required: true, validator: validatePassword }],
      },
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            await this.login(this.formObj);
            this.loading = false;
            this.$router.push("/");
          } catch (err) {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login-container {
  .el-form-item {
    position: relative;
  }
  .el-input {
    input {
      padding-left: 8%;
    }
  }
}
</style>
<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .login-form {
    width: 368px;
    margin: 0 auto;
    margin-top: 80px;
    .icon {
      color: rgba(0, 0, 0, 0.65);
      position: absolute;
      left: 10px;
      z-index: 10;
      top: 50%;
      transform: translateY(-50%);
    }
    .submit-btn {
      width: 100%;
    }
  }
}
</style>

