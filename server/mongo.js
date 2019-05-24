const mongo = require('mongodb').MongoClient
const config = require('./config.js')

function __connectDB() {
  return mongo.connect(config.dburl, { useNewUrlParser: true })
}

/**
 * 向数据库插入一个用户
 * @param {Object} user
 * @param {String} user.username
 * @param {String} user.password
 */

function insertUser(user) {
  if(!user.username || !user.password) {
    console.log('insert data error')
    return
  }

  __connectDB().then((client) => {
    var db = client.db('vchat')
    db.collection("users").insertOne(user, function(err, res) {
      if (err) {
        console.log(err)
      }
      console.log("insert number: " + res.insertedCount)
    })
  }).catch(err => console.log(err))
}

/**
 *
 * @param {Object} user
 * @param {String} user.username
 * @param {String} user.password
 */
function checkUser(user) {
  if(!user.username || !user.password) {
    console.log('user data error')
    return
  }

  return new Promise ( function(resolve) {
    __connectDB().then((client) => {
      var db = client.db('vchat')
      db.collection("users").findOne(
        { username: user.username, password: user.password },
        { projection: {_id:1} },
        function(err, res) {
          if (err) {
            console.log(err)
          }
          console.log('res: ', res)
          resolve(res)
        }
      )
    }).catch(err => console.log(err))
  })
}

module.exports = {
  insertUser,
  checkUser
}
