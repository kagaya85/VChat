<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-container>
      <el-menu class="user-list" default-active="0" @select="selected">
        <el-menu-item
          v-for="(user, index) in userList"
          :index="index.toString()"
          :key="index"
          >{{ index != 0 ? user.username : $t("chatRoom")}}</el-menu-item
        >
      </el-menu>
      <el-container>
        <el-header>
          <h1>
            {{selectIndex != 0 ? userList[selectIndex].username : $t("chatRoom")}}
          </h1>
        </el-header>
        <el-main>
          <el-scrollbar
            style=""
            :native="false"
            wrapStyle="overflow-x: hidden;"
            :noresize="false"
            tag="div"
          >
            <div class="msg-win">
              <Message
                v-for="(msg, index) in msgList[userList[selectIndex].username]"
                :key="index"
                :isMe="msg.username == $store.state.username"
                :username="msg.username"
                >{{ msg.content }}</Message
              >
            </div>
          </el-scrollbar>
          <SendBox class="send-box" @send="sendMsg"></SendBox>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld'
import SendBox from "@/components/SendBox";
import Message from "@/components/Message";
import io from "socket.io-client";

const config = {
  server: "http://127.0.0.1:3000/"
};

export default {
  name: "home",
  components: {
    // HelloWorld,
    SendBox,
    Message
  },
  data() {
    return {
      msgList: {
        'chatRoom': [
            // { username: "kagaya", content: "hi this is me" },
            // { username: "Tim", content: "hi this is Tim" },
            // { username: "Jack", content: "hi this is Jack" }
          ]
      },
      userList: [
        {
          username: 'chatRoom',
          uid: '0'
        },
      ],
      selectIndex: 0,
      socket: null
    };
  },
  mounted: function() {
    // 这里连接websocket
    this.socket = io.connect(config.server);

    this.socket.on('connect', () => {
      this.$message({
        message: this.$t('connected'),
        type: 'success'
      })
      // 发送online事件
      this.socket.emit('online',{
        username: this.$store.state.username,
        uid: this.$store.state.uid,
        token: this.$store.state.token
      })
    })

    // 更新用户列表
    this.socket.on('user-list', (data) => {
      this.userList = this.userList.concat(data)
    })

    // 连接失败
    this.socket.on("connect_error", () => {
      console.log("Connection failed")
      this.$message({
        message: this.$t('connect_error'),
        type: 'error'
      })
    })
    // 重连失败
    this.socket.on("reconnect_failed", () => {
      console.log("Reconnection failed")
    })
    // 用户上线
    this.socket.on('online', (data) => {
      this.$message(this.$t('hi') + ', ' + data.username + ' ' + this.$t('isOnline') + '!')
      if(data.username != this.$store.state.username){
        this.userList.push({username: data.username, uid: data.uid})
      }
    })
    // 用户下线
    this.socket.on('offline', (data) => {
      this.$message(this.$t('hi') + ', ' + data.username + ' ' + this.$t('isOffline') + '!')
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].username == data.username && this.userList[i].uid == data.uid){
          this.userList.splice(i, 1)  // remove user from list

          delete this.msgList[this.userList[i].username]  // remove message list

          if(this.selectIndex == i)
            this.selectIndex = 0

          break
        }
      }
    })
    // 发言
    this.socket.on('say', (data) => {
      console.log('Get message from ' + data.from)
      let username
      if(data.to == 'chatRoom') {
        username = 'chatRoom'
      }
      else{
        username = data.from
      }
      if(!this.msgList[username]) {
        this.$set(this.msgList, username, [])
      }

      this.msgList[username].push({username: data.from, content: data.content})
      this.$set(this.msgList, data.username, this.msgList[username]); // 这样赋值才能实时响应变化
    })
  },
  beforeDestroy: function() {
    // 断开连接
    this.socket.close()
  },
  methods: {
    sendMsg: function(message) {
      let toUsername = this.userList[this.selectIndex].username
      console.log('Send message', this.$store.state.username, toUsername)
      if (!this.msgList[toUsername]) {
        this.$set(this.msgList, toUsername, [])
      }

      this.msgList[toUsername].push({
        username: this.$store.state.username,
        content: message
      })

      this.$set(this.msgList, toUsername, this.msgList[toUsername]) // 这样赋值才能实时响应变化

      // 触发服务端事件
      this.socket.emit('say', {
        from: this.$store.state.username,
        to: toUsername,
        content: message
      })
    },
    selected: function(index) {
      this.selectIndex = index;
    }
  }
};
</script>

<style scoped>
.msg-win {
  background-color: #f2f2f2;
  min-height: 500px;
  padding: 20px;
}

.el-header {
  display: flex;
  align-items: center;
}

.el-scrollbar {
  height: 540px;
}

.el-menu-item {
  width: 180px;
  overflow: hidden;
  /* padding-right: 100px; */
}
</style>
