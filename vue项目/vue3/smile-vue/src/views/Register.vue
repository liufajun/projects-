<template>
  <div>
    <Header></Header>
    <div class="password-longin">
      <van-cell-group>
        <van-field
          class="phone-number"
          label="账号"
          v-model="userRegister.userName"
          placeholder="手机号/邮箱/用户名"
          left-icon="friends"
          clearable
          :error-message="usernameErrorMsg"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          class="phone-number"
          v-model="userRegister.password"
          type="password"
          label="密码"
          required
          clearable
          placeholder="请输入6-20位密码"
          left-icon="lock"
          :error-message="passwordErrorMsg"
        />
      </van-cell-group>
    </div>
    <van-button class="login-btn" @click="registerAction" :loading="openLoading">注册</van-button>
  </div>
</template>

<script>
import url from "@/urlApi.js";
import Header from "@/components/Header.vue";
export default {
  name: "register",
  data() {
    return {
      userRegister: {
        userName: "",
        password: ""
      },
      openLoading: false, //防止用户注册重复提交
      usernameErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "", //当密码出现错误时的提示信息
      isOk: false
    };
  },
  components: {
    Header
  },
  methods: {
    registerAction() {
      // 如果thiis.checkForm()为真则执行this.registerUser()，不用if和else
      this.checkForm() && this.registerUser();
    },
    // 点击注册方法
    registerUser() {
      // 第一次点击注册按钮时则为true,为true则可以请求数据
      this.openLoading = true;
      // 第二个参数是提交给后台的数据
      this.$http
        .post(url.registerUser, this.userRegister)
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.$toast.success(response.data.message);
            // 注册成功则跳转到首页
            this.$router.push("/");
          } else {
            // 注册失败点击注册按钮时则不会请求数据
            this.openLoading = false;
            this.$toast.fail("注册失败");
          }
        })
        .catch(error => {
          // 注册失败点击注册按钮时则不会请求数据
          this.openLoading = false;
          this.$toast.fail("注册失败");
        });
    },
    // 表单验证方法
    checkForm() {
      this.isOk = true;
      if (this.userRegister.userName.length < 2) {
        this.usernameErrorMsg = "用户名不能少于2位";
        this.isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.userRegister.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        this.isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return this.isOk;
    }
  }
};
</script>

<style lang="scss" scoped>
$width: calc(100% - 30px);

[class*="van-hairline"]::after {
  border-top: 0;
}
.password-longin {
  width: $width;
  margin: 0.2rem auto;
}
.van-field__left-icon .van-icon {
  font-size: 18px !important;
}
.login-btn {
  width: $width;
  margin-left: 0.3rem;
  margin-top: 0.4rem;
  background: #f60;
  border: 0;
  color: #fff;
}
.phone-number {
  border-bottom: 1px solid #ebedf0;
}
</style>