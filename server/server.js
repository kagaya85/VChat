const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// 使用中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
});

app.post('/login', (req, res) => {
  console.log('username:' + req.body.username)
  console.log('password:' + req.body.password)

  // 用户名密码校验
  if(req.body.username == 'kagaya' && req.body.password == '123') {
    res.status(200).json({
      username: 'kagaya',
      uid: '1'
    })
  }
  else {
    res.status(404)
  }
})

app.listen(port, () => console.log(`Server listen on port ${port}!`))

