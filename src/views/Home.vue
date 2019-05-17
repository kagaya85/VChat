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
          <Message v-for="(msg, index) in msgList" :key="index" :isMe='msg.isMe'>{{msg.content}}</Message>
        </el-main>
        <SendBox @send='sendMsg'></SendBox>
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
  },
  data() {
    return {
      msgList: [
        {isMe: true, content: 'hi this is me'},
        {isMe: false, content: 'hi this is Tim'},
        {isMe: false, content: 'hi this is Jack'},
      ]
    }
  },
  methods: {
    sendMsg: function(message) {
      this.msgList.push({isMe: true, content: message});
    }
  },
}
</script>

<style scoped>
.msg-win {
  background-color: #f2f2f2;
  height: 600px;
}

</style>
