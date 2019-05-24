<template>
  <div class="login-page">
    <div class="login-form">
      <div class="title">{{ $t("register") }}</div>
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
          <el-input
            :placeholder="$t('plsRepeatPassword')"
            prefix-icon="el-icon-key"
            v-model="repassword"
            maxlength="20"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="inputCode"
            :placeholder="$t('plsInputCode')"
            class="identifyinput"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="identifybox">
            <div @click="refreshCode">
              <identify :identifyCode="identifyCode"></identify>
            </div>
            <el-button @click="refreshCode" type="text" class="textbtn">
              {{ $t("changeCode") }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="wide-btn"
            :loading="false"
            @click="register"
            :disabled="btnDisabled"
            >{{ $t("confirm") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin: 20px;
  font-size: 40px;
}

.identifybox {
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
}
</style>

<script>
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
import identify from "@/components/IdentifyCode.vue";
export default {
  name: "Rigister",
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
      btnDisabled: false,
      identifyCodes: "1234567890",
      identifyCode: "",
      inputCode: ""
    };
  },
  components: {
    identify
  },
  mounted: function() {
    this.btnDisabled = false;
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    register: function() {
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
      } else if (this.repassword == "") {
        this.$message({
          message: this.$t("plsRepeatPassword") + "!",
          type: "warning"
        });
        return;
      } else if (this.repassword != this.password) {
        this.$message({
          message: this.$t("passwordNotSame") + "!",
          type: "warning"
        });
        return;
      } else if (this.inputCode == "") {
        this.$message({
          message: this.$t("plsInputCode") + "!",
          type: "warning"
        });
        return;
      } else if (this.inputCode != this.identifyCode) {
        this.$message({
          message: this.$t("InputCodeErr") + "!",
          type: "warning"
        });
        return;
      }

      // 禁用按钮
      this.btnDisabled = true;

      // axios 异步请求
      this.axios
        .post(
          "/register",
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
          console.log("res.status:", res.status);
          if (res.status == 200) {
            // 消息提示
            this.$message({
              message: this.$t("registerOK") + "!",
              type: "success"
            });
            // 1s后跳转跳转登陆页面
            wait(1500).then(() => {
              this.$router.push("/login");
              this.btnDisabled = false;
            });
          } else {
            // 404
            // 注册失败
            this.$message({
              message: this.$t("registerFailed") + "!",
              type: "error"
            });
            // 解除禁用
            this.btnDisabled = false;
          }
        })
        .catch(err => {
          console.log(err);
          // 注册失败
          this.$message({
            message: this.$t("registerFailed") + "!",
            type: "error"
          });
          // 解除禁用
          this.btnDisabled = false;
        });
    },
    // 生成随机数
    randomNum: function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode: function() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode: function(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  }
};
</script>
