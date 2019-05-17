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
          <el-button type="primary">{{ $t("login") }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  min-height: 600px;
  height: 70vh;
}

.title {
  margin: 20px;
  font-size: 40px;
}

.login-form {
  padding: 50px;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {},
  methods: {}
};
</script>