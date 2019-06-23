<template>
  <div class="login-page">
    <div class="login-form">
      <div class="title">{{ $t("hello") }}!</div>
      <el-form>
        <el-form-item>
          <el-input
            :placeholder="$t('plsInputUsername')"
            prefix-icon="el-icon-user"
            v-model="username"
            maxlength="20"
            clearable
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :placeholder="$t('plsInputPassword')"
            prefix-icon="el-icon-key"
            v-model="password"
            maxlength="20"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="wide-btn"
            :loading="false"
            @click="login"
            :disabled="btnDisabled"
            >{{ $t("login") }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            class="wide-btn"
            @click="register"
            :disabled="btnDisabled"
            >{{ $t("register") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
/* .login-page {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  min-height: 600px;
  height: 70vh;
} */

.title {
  margin: 20px;
  font-size: 40px;
}

/* .login-form {
  padding: 50px;
  min-width: 230px;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.wide-btn {
  width: 100%;
} */
</style>

<script>
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      btnDisabled: false
    };
  },
  components: {},
  mounted: function() {
    this.$message({
      message: "这是您第1次访问VChat!",
      type: "info"
    });
  },
  methods: {
    login: function() {
      if (this.username == "") {
        this.$message({
          message: this.$t("plsInputUsername") + "!",
          type: "warning"
        });
        return;
      } else if (this.password == "") {
        this.$message({
          message: this.$t("plsInputPassword") + "!",
          type: "warning"
        });
        return;
      }
      // 禁用按钮
      this.btnDisabled = true;
      // axios 异步请求
      this.axios
        .post(
          "/login",
          {
            username: this.username,
            password: this.password
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }
        )
        .then(res => {
          if (res.status == 200) {
            // 登陆成功
            this.$store.commit("login", res.data);
            // 消息提示
            this.$message({
              message: this.$t("welcome") + "!",
              type: "success"
            });
            // 1.5s后跳转跳转页面
            wait(1500).then(() => {
              this.$router.push("/");
              this.btnDisabled = false;
            });
          } else {
            // 404
            // 登陆失败
            this.$message({
              message: this.$t("loginFailed") + "!",
              type: "error"
            });

            this.btnDisabled = false;
          }
        })
        .catch(err => {
          console.log(err);
          // 登陆失败
          this.$message({
            message: this.$t("loginFailed") + "!",
            type: "error"
          });

          this.btnDisabled = false;
        });
    },
    register: function() {
      this.$router.push("/register");
    }
  } // methods
};
</script>
