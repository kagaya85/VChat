const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const port = 3000

var users = {}
// var socketList = []

// 测试用
var userList = {
  kagaya: {
    uid: '1',
    password: '123'
  },
  tim: {
    uid: '2',
    password: '123'
  },
  mike: {
    uid: '3',
    password: '123'
  },
}
// 使用中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

server.listen(port, () => console.log(`Server listen on port ${port}!`))

app.post('/login', function(req, res) {
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true")
  // res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  console.log("get request from " + req.headers.origin)
  
  if(req.method == "OPTIONS") { 
    res.sendStatus(200) // 让options请求快速返回
  }
  else {
    // 登陆请求处理
    console.log('username:' + req.body.username)
    console.log('password:' + req.body.password)

    // 用户名密码校验
    if(userList.hasOwnProperty(req.body.username) && userList[req.body.username].password == req.body.password) {
      res.status(200).json({
        username: req.body.username,
        uid: userList[req.body.username].uid,
        token: 'abcde'
      })
    }
    else {
      res.status(404)
    }
  }
});

io.sockets.on('connection', function (socket) {
  //有人上线
  socket.on('online', function (data) {
    //将上线的用户名存储为 socket 对象的属性，以区分每个 socket 对象，方便后面使用
    socket.name = data.username;
    socket.uid = data.uid;
    //users 对象中不存在该用户名则插入该用户名
    if (!users[data.username]) {
      users[data.username] = data.username;
    }
    //向所有用户广播该用户上线信息
    io.sockets.emit('online', {username: data.username, uid: data.uid});
  });

  //有人发话
  socket.on('say', function (data) {
    if (data.to == 'chatRoom') {
      // 聊天室
      socket.broadcast.emit('say', data);
    } else {
      //向特定用户发送该用户发话信息
      //clients 为存储所有连接对象的数组
      var clients = io.sockets.clients();
      //遍历找到该用户
      clients.forEach(function (client) {
        if (client.name == data.to) {
          //触发该用户客户端的 say 事件
          client.emit('say', data);
        }
      });
    }
  });

  //有人下线(断开连接)
  socket.on('disconnect', function() {
    //若 users 对象中保存了该用户名
    if (users[socket.name]) {
      //从 users 对象中删除该用户名
      delete users[socket.name];
      //向其他所有用户广播该用户下线信息
      socket.broadcast.emit('offline', {username: socket.name, uid: socket.uid});
    }
  });

})