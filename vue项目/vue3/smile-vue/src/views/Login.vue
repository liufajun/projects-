<template>
  <div class="login">
    <div class="header">
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="goBack">
        <!-- <van-icon name="search" size="16px" slot="right"/> -->
      </van-nav-bar>
    </div>
    <div class="password-longin">
      <van-cell-group>
        <van-field
          class="phone-number"
          label="账号"
          v-model="userLogin.userName"
          placeholder="手机号/邮箱/用户名"
          left-icon="friends"
          clearable
          :error-message="usernameErrorMsg"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          class="phone-number"
          v-model="userLogin.password"
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
    <van-button class="login-btn" @click="loginAction" :loading="openLoading">登录</van-button>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import url from "@/urlApi.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "login",
  data() {
    return {
      userLogin: {
        userName: "",
        password: ""
      },
      openLoading: false, //防止用户注册重复提交
      usernameErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "", //当密码出现错误时的提示信息
      isOk: false,
      title: "用户登录"
    };
  },
  components: {
    Header,
    Footer
  },
  created() {
    //   if(localStorage.userInfo){
    // 	  this.$toast.success("你已经登录过了")
    // 	  this.$router.push("/")
    //   }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      // 如果thiis.checkForm()为真则执行this.registerUser()，不用if和else
      this.checkForm() && this.loginUser();
    },
    // 点击登录方法
    loginUser() {
		// 判断用户是否登陆过
    //   if (localStorage.userInfo) {
    //     // this.$toast.success("你已经登录过了");
    //     this.$router.push("/");
    //   }
      // 第一次点击注册按钮时则为true,为true则可以请求数据
      this.openLoading = true;
      // 第二个参数是提交给后台的数据
      this.$http
        .post(url.login, this.userLogin)
        .then(response => {
          console.log(response);
          //   response.data.message为true则用户名和密码都是正确的
          if (response.data.code == 200 && response.data.message) {
            //   存储到本地之后在执行后面代码
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.userLogin.userName };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                if (response.data.noUserName) {
                  this.usernameErrorMsg = "用户名不存在";
                } else {
                  this.$toast.success("登录成功");
                  this.$router.push("/");
                }
              })
              .catch(err => {
                this.$toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            // 注册失败点击注册按钮时则不会请求数据
            this.openLoading = false;
            this.passwordErrorMsg = "密码错误";
          }
        })
        .catch(error => {
          // 注册失败点击注册按钮时则不会请求数据
          this.openLoading = false;
          this.$toast.fail("登录失败");
        });
    },
    // 表单验证方法
    checkForm() {
      this.isOk = true;
      if (this.userLogin.userName.length < 2) {
        this.usernameErrorMsg = "用户名不能少于2位";
        this.isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.userLogin.password.length < 6) {
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
$colorE5017d: #e5017d;
$fontSize: 14px;
$height: 44px;
.login{
  padding-top: $height;
}
// header
.header {
  width: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.van-nav-bar {
  background: $colorE5017d;
  height: $height;
  line-height: $height;
}
.van-hairline--bottom::after {
  border-bottom-width: 0px;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__title {
  color: #fff;
  font-size: $fontSize;
}
.van-nav-bar__text {
  color: #fff;
}
// .password-longin
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