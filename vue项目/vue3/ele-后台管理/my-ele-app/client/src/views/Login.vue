<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">米修在线后台管理系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登  录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
// jwt-code模块用于解析token
 import jwt_decode from "jwt-decode";

export default {
  name: "login",
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      /**
       * 需要验证的属性(ele提供的一些登录验证)
       * 注意: rules验证定义的属性名尽量与双向绑定的属性名相同
       * trigger: "blur" (什么时候触发,失去焦点时触发)
       */
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
				  // console.log(res)

            // 登录成功(token在data里)
			  	  const { token } = res.data;
				    //存储到本地
            localStorage.setItem("eleToken", token);
            console.log(token)
            // 解析token
            const decode = jwt_decode(token);
            console.log(decode)

            /**
             * 存储数据(把解析后的token存到vuex里,第一个参数是store.js里定义的)
             * 判断decode是否为空,为空则没授权,不为空则授权
             * 
            */ 
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);

            // 页面跳转
            this.$router.push("/index");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 判断是否为空
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


