const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const port = 3000

var onlineList = []
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

app.all('*', function(req, res, next) {
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
    next()
  }
})

// 登陆处理
app.post('/login', function(req, res) {
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
})

// app.post('/register', function(req, res) {
//   // 注册请求处理
//   console.log('username:' + req.body.username)
//   console.log('password:' + req.body.password)

// })

// 消息首发处理
io.sockets.on('connection', function (socket) {
  // console.log('connected')
  //有人上线
  socket.on('online', function (data) {
    console.log('[Online] ' + data.username)
    //将上线的用户名存储为 socket 对象的属性，以区分每个 socket 对象，方便后面使用
    socket.username = data.username;
    socket.uid = data.uid;

    // 发送当前在线用户
    socket.emit('user-list', onlineList)

    //users 对象中不存在该用户名则插入该用户名
    onlineList.push({
      username: data.username,
      uid: data.uid
    })

    //向其他用户广播该用户上线信息
    socket.broadcast.emit('online', {username: data.username, uid: data.uid});
  })

  //有人发话
  socket.on('say', function (data) {
    console.log('[Say] ' + data.from, data.to, data.content)
    if (data.to == 'chatRoom') {
      // 聊天室
      socket.broadcast.emit('say', data)
    } else {
      //向特定用户发送该用户发话信息
      for(let key in io.sockets.connected) {
        //遍历找到该用户
        if(io.sockets.connected[key].username == data.to) {
          //触发该用户客户端的 say 事件
          console.log('[Say] send to ', data.to, data.content)
          io.sockets.connected[key].emit('say', data)
        }
      }
    }
  })

  //有人下线(断开连接)
  socket.on('disconnect', function() {
    console.log('[Offline] ' + socket.username)

    for(let i = 0; i < onlineList.length; i++) {
      if (socket.username == onlineList[i].username && socket.uid == onlineList[i].uid) {
        onlineList.splice(i, 1)
        break;
      }
    }

    //向其他所有用户广播该用户下线信息
    socket.broadcast.emit('offline', {username: socket.name, uid: socket.uid})
    console.log(onlineList)
  })
})