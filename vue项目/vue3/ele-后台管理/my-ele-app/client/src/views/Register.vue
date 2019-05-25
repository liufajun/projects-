<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">element后台管理系统</span>
      </div>
      <!-- ref="registerForm" (就是表单里输入的内容)， :rules="rules" (验证方法)-->
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  name: "register",
  components: {},
  data() {
      /**
       * 验证确认密码是否一致
       * rule: 验证规则
       * value: 第二次输入的密码
       */
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        passward: "",
        password2: "",
        identity: ""
      },
      /**
       * 需要验证的属性(ele提供的一些验证)
       * 注意: rules验证定义的属性名尽量与双向绑定的属性名相同
       * required: true (必填)
       * message: 提示的错误信息
       * trigger: "blur" (什么时候触发,失去焦点时触发)
       * min: 字符最小长度
       * max: 字符最大长度
       *
       */

      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
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
          { min: 6, max: 30, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          //确认输入的密码是否一致(第一个参数是回调函数)
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
     // 参数formName就是 ref="registerForm" (就是表单里输入的内容)
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 第一个参数是接口地址,第二个参数是要传给后台的数据
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              // 注册成功则提示(element-ui里的信息提示方法)
              this.$message({
                message: "注册成功！",
                type: "success"
              });
              //然后跳转到注册页面
              this.$router.push("/login");
            });
        } else {
          this.$message({
            showClose: true,
            message: '注册失败',
            type: 'error'
          });
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
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
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.el-form-item {
  margin-bottom: 26px;
}
.submit_btn {
  width: 100%;
}
</style>


