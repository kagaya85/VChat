<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-container>
      <el-menu class="user-list" @select='selected'>
        <el-menu-item index="0">{{$t('chatRoom')}}</el-menu-item>
        <el-menu-item v-for="(user, index) in usrList" :index="user.id.toString()" :key="index + 1">{{user.name}}</el-menu-item>
      </el-menu>
      <el-container>
        <el-header>
          <h1>{{selectIndex != 0 ? usrList[selectIndex - 1].name : $t('chatRoom')}}</h1>
        </el-header>
        <el-main>
          <el-scrollbar style="" :native="false" wrapStyle="overflow-x: hidden;" :noresize="false" tag="div">
            <div class="msg-win">
              <Message v-for="(msg, index) in msgList[selectIndex]" :key="index" :isMe="msg.username == $store.state.username" :username="msg.username">{{msg.content}}</Message>
            </div>
          </el-scrollbar>
          <SendBox class="send-box" @send='sendMsg'></SendBox>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld'
import SendBox from '@/components/SendBox'
import Message from '@/components/Message'

export default {
  name: 'home',
  components: {
    // HelloWorld,
    SendBox,
    Message
  },
  data() {
    return {
      msgList: [
        [
          {username: 'kagaya', content: 'hi this is me'},
          {username: 'Tim', content: 'hi this is Tim'},
          {username: 'Jack', content: 'hi this is Jack'},
        ]
      ],
      usrList: [
        {name: 'Jack', id: 1},
        {name: 'Mike', id: 2},
        {name: 'Cindy', id: 3}
      ],
      selectIndex: 0
    }
  },
  methods: {
    sendMsg: function(message) {
      if(this.msgList[this.selectIndex] == null)
        this.msgList[this.selectIndex] = [];
      this.msgList[this.selectIndex].push({isMe: true, content: message});
      this.$set(this.msgList, this.selectIndex, this.msgList[this.selectIndex]);  // 这样赋值才能实时响应变化
    },
    selected: function(index, path) {
      this.selectIndex = index;
    }
  },
}
</script>

<style scoped>
.msg-win {
  background-color: #f2f2f2;
  min-height: 500px;
  padding: 20px;
}

.el-header {
  display: flex;
  align-items:center;
}

.el-scrollbar {
  height: 540px;
}

.el-menu-item {
  padding-right: 100px;
}

</style>
