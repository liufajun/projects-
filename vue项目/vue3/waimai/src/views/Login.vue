<template>
  <div class="login">
    <div class="login-header">
      <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="login-tab">
      <van-tabs v-model="active">
        <van-tab title="快捷登录">
          <div class="fast-login">
            <!-- 手机号 -->
            <div class="phone">
              <van-field class="phone-number" v-model="phone" label="手机号" placeholder="请输入手机号"/>
            </div>
            <!-- 拖动滑块验证 -->
            <DropSlide></DropSlide>
            <!-- 手机短信验证 -->
            <div class="phone-info">
              <van-cell-group>
                <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                  <van-button slot="button" size="small" class="send-num">发送验证码</van-button>
                </van-field>
              </van-cell-group>
            </div>
          </div>
        </van-tab>
        <van-tab title="账号密码登录">
          <div class="password-longin">
            <van-cell-group>
			  <van-field class="phone-number" label="账号" placeholder="手机号/邮箱/用户名" left-icon="friends"/>
            </van-cell-group>
            <van-cell-group>
			   <van-field class="phone-number" label="账号" placeholder="请输入6-20位密码" left-icon="lock"/>
            </van-cell-group>
          </div>
        </van-tab>
      </van-tabs>

      <!-- 登录按钮 -->
      <van-button class="login-btn">登录</van-button>
      <!-- 快速注册按钮 -->
      <div class="register-btn-box">
        <van-button class="register-btn">快速注册</van-button>
      </div>
      <!-- 登录方式 -->
      <div class="login-way">
        <div class="login-way-head">
          <div class="line"></div>
          <span>其他登录方式</span>
          <div class="line"></div>
        </div>
        <div class="login-way-items">
          <a class="login-way-item" href="javascript:;">
            <i class="qq-icon"></i>
            <span>QQ</span>
          </a>
          <a class="login-way-item" href="javascript:;">
            <i class="wx-icon"></i>
            <span>微信</span>
          </a>
        </div>
      </div>
      <div class="agreement-tips">
        登录即代表你已同意
        <a href="javascript:;">《京东隐私政》</a>
      </div>
    </div>
  </div>
</template>
<script>
import DropSlide from "../components/login/DrogSlide";
export default {
  name: "login",
  components: {
    DropSlide
  },
  data() {
    return {
      active: 0,
      phone: "",
      sms: ""
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    }
  }
};
</script>
<style lang="scss" scoped>
$width: calc(100% - 30px);
.login-header {
  font-size: 14px;
}
.van-nav-bar__left,
.van-nav-bar__right {
  font-size: 16px;
}
.van-nav-bar__arrow {
  font-size: 16px;
}
.van-nav-bar__arrow + .van-nav-bar__text {
  padding-left: 22px;
}
.fast-login {
  margin-top: 30px;
}
.van-cell {
  padding: 10px 0;
}
[class*="van-hairline"]::after {
  border-top: 0;
}
.phone {
  width: $width;
  margin: 20px auto 10px;
}
.phone-number {
  border-bottom: 1px solid #ebedf0;
}
.phone-info {
  width: $width;
  margin: 20px auto;
}
.send-num {
  background: #ebedf0;
}
.login-btn {
  width: $width;
  margin-left: 15px;
  background: #f60;
  border: 0;
  color: #fff;
}
.register-btn-box {
  width: 2.2rem;
  margin: 0 auto;
  .register-btn {
    width: 100%;
    text-align: center;
    border: 1px solid #f60;
    color: #f60;
    height: 32px;
    line-height: 30px;
  }
}
.password-longin {
  width: $width;
  margin: 40px auto 10px;
}
.van-field__left-icon .van-icon{
	font-size: 18px !important;
}

.login-way {
  font-size: 14px;
  margin-top: 2rem;
  .login-way-head {
    width: $width;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .line {
      height: 1px;
      flex: 1;
      background: #ebedf0;
    }
    span {
      padding: 0 0.25rem;
      color: #999;
    }
  }
  .login-way-items {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    a {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 0 20px;
      font-size: 12px;
      color: #999;
      i {
        display: block;
        width: 48px;
        height: 48px;
      }
      i.qq-icon {
        background: url("../assets/img/qq-icon.png");
        background-size: 100% 100%;
      }
      i.wx-icon {
        background: url("../assets/img/wx-icon.png");
        background-size: 100% 100%;
      }
      span {
        padding-top: 3px;
      }
    }
  }
}
.agreement-tips {
  padding: 0.4rem 0 1.2rem;
  text-align: center;
  font-size: 12px;
  color: #bebebe;
  a {
    font-size: 12px;
    color: #409eff;
  }
}
</style>

