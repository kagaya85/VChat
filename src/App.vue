<template>
  <div id="app">
    <el-container>
      <el-header class="app-header">
        <h1 class="vchat">VChat</h1>
        <b v-if="isLogin">{{$t('welcome')}}, {{username}}!</b>
      </el-header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
      <router-view/>
      <!-- <el-footer>
      </el-footer> -->
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    isLogin: function() {
      return this.$store.state.uid;
    },
    username: function() {
      return this.$store.state.username;
    }
  }
}
</script>

<style>
.vchat {
  margin: 15px 0px 0px 0px
}

.app-header {
  margin-bottom: 10px;
}

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
