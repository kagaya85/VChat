const mongo = require('mongodb').MongoClient
const config = require('./config.js')

function __connectDB() {
  return mongo.connect(config.dburl, { useNewUrlParser: true })
}

var users = [
  {
    username: 'Kagaya',
    password: "970805"
  },
  {
    username: 'Tim',
    password: "123456"
  },
  {
    username: 'Hibiki',
    password: "123456"
  }
]

__connectDB().then((client) => {
  var db = client.db('vchat')
  db.collection("users").insertMany(users, function(err, res) {
    if (err) throw err;
    console.log("插入的文档数量为: " + res.insertedCount)
  })
}).catch(err => console.log(err))
