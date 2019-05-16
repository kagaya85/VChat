<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-container>
      <el-aside width="300px" class="user-list">
        <UserItem username="test"></UserItem>
        <UserItem username="test"></UserItem>
        <UserItem username="test"></UserItem>
        <UserItem username="test"></UserItem>
      </el-aside>
      <el-container>
        <el-header>title</el-header>
        <el-main class="msg-win">
          <Message>test</Message>
          <Message>test1234</Message>
        </el-main>
        <SendBox></SendBox>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld'
import UserItem from '@/components/UserItem'
import SendBox from '@/components/SendBox'
import Message from '@/components/Message'

export default {
  name: 'home',
  components: {
    // HelloWorld,
    UserItem,
    SendBox,
    Message
  }
}
</script>

<style scoped>
.msg-win {
  background-color: #f2f2f2;
  height: 800px;
}

</style>
