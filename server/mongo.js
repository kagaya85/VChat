const mongo = require('mongodb').MongoClient
const config = require('./config.js')

function __connectDB() {
  return mongo.connect(config.dburl, {
    useNewUrlParser: true
  })
}

/**
 * 向数据库插入一个用户
 * @param {Object} user
 * @param {String} user.username
 * @param {String} user.password
 * @returns {Promise}
 */
function insertUser(user) {
  if (!user.username || !user.password) {
    console.log('insert data error')
    return
  }

  return new Promise(function (resolve, reject) {
    __connectDB().then((client) => {
      var db = client.db('vchat')
      db.collection("users").insertOne(user, function (err, res) {
        if (err) {
          reject(err)
        }
        console.log("1 document inserted")
        resolve(res)
      })
    }).catch(err => console.log(err))
  })
}

/**
 *
 * @param {Object} user
 * @param {String} user.username
 * @param {String} user.password
 * @returns {Promise}
 */
function checkUser(user) {
  if (!user.username || !user.password) {
    console.log('user data error')
    return
  }

  return new Promise(function (resolve, reject) {
    __connectDB().then((client) => {
      var db = client.db('vchat')
      db.collection("users").findOne({
          username: user.username,
          password: user.password
        }, {
          projection: {
            _id: 1
          }
        },
        function (err, res) {
          if (err) {
            reject(err)
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
