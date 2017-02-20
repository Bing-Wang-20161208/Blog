var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});//设置数据库名、数据库地址、数据库端口号，创建了一个数据库连接实例，并通过module.exports导出该实例
/*
module.exports = function() {
  return new Db(settings.db, new Server(settings.host, settings.port), {safe: true, poolSize: 1});//设置数据库名、数据库地址、数据库端口号，创建了一个数据库连接实例，并通过module.exports导出该实例
}//此处导出的函数，每次调用该函数则创建一个数据库连接
*/
