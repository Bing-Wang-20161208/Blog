var ObjectID = require('mongodb').ObjectID;//使用ID检索，避免同名bug
var mongodb = require('./db');
//var markdown = require('markdown').markdown;//kindEditor代替
/*//数据库连接池
var Db = require('./db');
//var markdown = require('markdown').markdown;
var poolModule = require('generic-pool');
var pool = poolModule.createPool({//创建了一个数据库连接池
  name: 'mongoPool',//连接池名字
  create: function(callback) {//创建一条数据库连接的方法，并返回创建的连接
    var mongodb = Db();
    mongodb.open(function(err, db) {
      callback(err, db);
    })
  },
  destroy: function(mongodb) {//如何销毁连接
    mongodb.close()
  },
  max: 10000,//连接池中最大连接数
  min: 0,//连接池中最小连接数
  idleTimeoutMillis: 30000,//不活跃连接销毁的毫秒数
  log: true//打印连接池日志
});
*/
function Post(name, head, title, tags, post) {
  this.name = name;
  this.head = head;
  this.title = title;
  this.tags = tags;
  this.post = post;
}
module.exports = Post;
//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + '_' + (date.getMonth() + 1),
    day: date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate(),
    minute: date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  }
  //要存入数据库的文档
  var post = {
    name: this.name,
    head: this.head,
    time: time,
    title: this.title,
    tags: this.tags,//添加标签
    post: this.post,
    comments: [],//存储留言，一个个对象
    reprint_info: {},//转载
    pv: 0//page view 站长统计
  };
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    //读取posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //将文档插入posts集合
      collection.insert(post, {safe: true}, function(err) {
        mongodb.close()
        if (err) {
          return callback(err);//失败，返回err
        }
        callback(null);//返回err为null
      });
    });
  });
};
/*
//读取文章及其相关信息
Post.getAll = function(name, callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    //读取posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      var query = {};
      if (name) {
        query.name = name;
      }
      //根据query对象查询文章
      collection.find(query).sort({time: -1}).toArray(function(err, docs) {
        mongodb.close()
        if (err) {
          return callback(err);//失败，返回err
        }
        //解析markdown为html
        docs.forEach(function(doc) {
          doc.post = markdown.toHTML(doc.post);
        })
        callback(null, docs);//成功，以数组形式返回查询的结果
      });
    });
  });
};
*/
//给博客的主页和用户页面增加分页功能
//一次获取十篇文章
Post.getTen = function(name, page, callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    //读取posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      var query = {};
      if (name) {
        query.name = name;
      }
      //使用count返回特定查询的文档数total
      collection.count(query, function(err, total) {
        //根据query对象查询，并跳过前(page-1)*10个结果，返回之后的10个结果
        collection.find(query, {
          skip: (page - 1) * 10,
          limit: 10
        }).sort({
          time: -1
        }).toArray(function(err, docs) {
          mongodb.close()
          if (err) {
            return callback(err);
          }
          /*//解析markdown为HTML
          docs.forEach(function(doc) {
            doc.post = markdown.toHTML(doc.post);
          });
          */
          callback(null, docs, total);
        });
      });
    });
  });
};
//获取一篇文章
Post.getOne = function(_id, callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    //读取posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //根据用户名、发表日期及文章名进行查询
      collection.findOne({
        "_id": new ObjectID(_id)
      }, function(err, doc) {
        if (err) {
          mongodb.close()
          return callback(err);
        }
        if (doc) {
          //每访问1次，pv值增加1
          collection.update({
            "_id": new ObjectID(_id)
          }, {
            $inc: {"pv": 1}
          }, function(err) {
            mongodb.close()
            if (err) {
              return callback(err);
            }
          });
          /*//解析markdown为html，文章和留言都适用
          doc.post = markdown.toHTML(doc.post);
          doc.comments.forEach(function(comment) {
            comment.content = markdown.toHTML(comment.content);
          });
          */
          callback(null, doc);//返回查询的一篇文章
        }
      });
    });
  });
};
//注册编辑、删除链接的点击事件的响应
//返回原始发表的内容（markdown格式）
Post.edit = function(name, day, title, callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    //读取posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //根据用户名、发表日期及文章名进行查询
      collection.findOne({
        "name": name,
        "time.day": day,
        "title": title
      }, function(err, doc) {
        mongodb.close()
        if (err) {
          return callback(err);
        }
        callback(null, doc);//返回查询后的一篇文章（markdown格式）
      });
    });
  });
};
//将修改后的文章提交到数据库
//更新一篇文章及其相关信息
Post.update = function(name, day, title, post, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //更新文章内容
      collection.update({
        "name": name,
        "time.day": day,
        "title": title
      }, {
        $set: {post: post}
      }, function(err) {
        mongodb.close()
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
};
//实现删除文章的功能
//删除一篇文章
Post.remove = function(name, day, title, callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    //读取posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //查询要删除的文档
      collection.findOne({
        "name": name,
        "time.day": day,
        "title": title
      }, function(err, doc) {
        if (err) {
          mongodb.close()
          return callback(err);
        }
        //如果有reprint_from，即该文章是转载来的，先保存下来reprint_from
        var reprint_from = "";
        if (doc.reprint_info.reprint_from) {
          reprint_from = doc.reprint_info.reprint_from;
        }
        if (reprint_from != "") {
          //更新原文章所在文档的reprint_to
          collection.update({
            "name": reprint_from.name,
            "time.day": reprint_from.day,
            "title": reprint_from.title
          }, {
            $pull: {//使用$pull来删除数组中的特定项
              "reprint_info.reprint_to": {
                "name": name,
                "day": day,
                "title": title
              }
            }
          }, function(err) {
            if (err) {
              mongodb.close()
              return callback(err);
            }
          });
        }
        //删除转载来的文章所在的文档
        collection.remove({
          "name": name,
          "time.day": day,
          "title": title
        }, {w: 1}, function(err) {
          mongodb.close()
          if (err) {
            return callback(err);
          }
          callback(null);
        });
      });
    });
  });
};
//实现存档页，按年份和日期的降序列出所有文章
//返回所有文章的存档信息
Post.getArchive = function(callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    //读取posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //返回只包含name、time、title属性的文档组成的存档数组
      collection.find({}, {
        "name": 1,
        "time": 1,
        "title": 1
      }).sort({
        time: -1
      }).toArray(function(err, docs) {
        mongodb.close()
        if (err) {
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};
//返回所有标签
Post.getTags = function(callback) {
  //打开数据库
  mongodb.open(function(err, db){
    if (err) {
      return callback(err);
    }
    //取得所有posts集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //distinct用来找出给定键的所有不同值
      collection.distinct("tags", function(err, docs) {
        mongodb.close()
        if (err) {
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};
//返回含有特定标签的所有文章
Post.getTag = function(tags, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //查询所有tags数组内包含tag的文档，并返回只含有name、time、title组成的数组
      collection.find({
        "tags": tag
      }, {
        "name": 1,
        "time": 1,
        "title": 1
      }).sort({
        time: -1
      }).toArray(function(err, docs) {
        mongodb.close()
        if (err) {
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};
//增加文章检索功能
//返回通过标题关键字查询的所有文章信息
Post.search = function(keyword, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      var pattern = new RegExp(keyword, "i");
      collection.find({
        "title": pattern
      }, {
        "name": 1,
        "time": 1,
        "title": 1
      }).sort({
        time: -1
      }).toArray(function(err, docs) {
        mongodb.close()
        if (err) {
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};
//转载一篇文章
Post.reprint = function(reprint_from, reprint_to, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }
      //找到被转载的文章的原文档
      collection.findOne({
        "name": reprint_from.name,
        "time.day": reprint_from.day,
        "title": reprint_from.title
      }, function(err, doc) {
        if (err) {
          mongodb.close()
          return callback(err);
        }
        var date = new Date();
        var time = {
          date: date,
          year: date.getFullYear(),
          month: date.getFullYear() + "_" + (date.getMonth() + 1),
          day: date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate(),
          minute: date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes < 10 ? '0' + date.getMinutes() : date.getMinutes())
        }
        delete doc._id;//注意要删掉原来的_id
        doc.name = reprint_to.name;
        doc.head = reprint_to.head;
        doc.time = time;
        doc.title = (doc.title.search(/[转载]/) > -1) ? doc.title : "[转载]" + doc.title;
        doc.comments = [];
        doc.reprint_info = {"reprint_from": reprint_from};
        doc.pv = 0;
        //更改被转载的原文档的reprint_info内的reprint_to
        collection.update({
          "name": reprint_from.name,
          "time.day": reprint_from.day,
          "title": reprint_from.title
        }, {
          $push: {
            "reprint_info.reprint_to": {
              "name": doc.name,
              "day": time.day,
              "title": doc.title
            }
          }
        }, function(err) {
          if (err) {
            mongodb.close()
            return callback(err);
          }
        });
        //将转载生成的副本修改后存入数据库，兵返回存档后的文档
        collection.insert(doc, {
          safe: true
        }, function(err, post) {
          mongodb.close()
          if (err) {
            return callback(err);
          }
          callback(err, post[0]);
        });
      });
    });
  });
};
