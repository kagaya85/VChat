var baseUrl = "mongodb://admin:123456@localhost:27017"
// var dbname = "/vchat"; // 数据库名称
var options = "?authSource=admin"
module.exports = {
  "dburl": baseUrl + options
};
