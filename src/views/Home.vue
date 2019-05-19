<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-container>
      <el-menu class="user-list" default-active="0" @select="selected">
        <el-menu-item index="0">{{ $t("chatRoom") }}</el-menu-item>
        <el-menu-item
          v-for="(user, index) in usrList"
          :index="user.id.toString()"
          :key="index + 1"
          >{{ user.name }}</el-menu-item
        >
      </el-menu>
      <el-container>
        <el-header>
          <h1>
            {{
              selectIndex != 0 ? usrList[selectIndex - 1].name : $t("chatRoom")
            }}
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
                v-for="(msg, index) in msgList[selectIndex]"
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
      msgList: [
        [
          { username: "kagaya", content: "hi this is me" },
          { username: "Tim", content: "hi this is Tim" },
          { username: "Jack", content: "hi this is Jack" }
        ]
      ],
      usrList: [
        { name: "Jack", id: 1 },
        { name: "Mike", id: 2 },
        { name: "Cindy", id: 3 }
      ],
      selectIndex: 0,
      socket: null
    };
  },
  mounted: function() {
    // 这里连接websocket
    this.socket = io.connect(config.server);

    // 连接失败
    socket.on("connect_error", function() {
      console.log("Connection failed");
    })
    // 重连失败
    socket.on("reconnect_failed", function() {
      console.log("Reconnection failed");
    })
    // 用户上线
    socket.on('online', function (data) {

    })
    // 用户下线
    socket.on('offline', function (data) {

    })
  },
  beforeDestroy: function() {
    // 断开连接
    this.socket.close();
  },
  methods: {
    sendMsg: function(message) {
      if (this.msgList[this.selectIndex] == null)
        this.msgList[this.selectIndex] = [];
      this.msgList[this.selectIndex].push({
        username: this.$store.state.username,
        content: message
      });
      this.$set(this.msgList, this.selectIndex, this.msgList[this.selectIndex]); // 这样赋值才能实时响应变化
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
  padding-right: 100px;
}
</style>
