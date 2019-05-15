<template>
  <div class="login" v-show="isLogin">
    <LoginForm></LoginForm>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  text-align: center;
  align-items: center;
}
</style>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: "login",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  components: {
    LoginForm
  },
  methods: {}
};
</script>