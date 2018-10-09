var express = require("express");
var qiniu = require("qiniu");
var app = express();

var accessKey = 'ou3nqIBBYsjPgOimh6ooHI6LGMzhf8NdpLY9UVbp';
var secretKey = 'aZ-cUqMzrnZMjjauURE3kfYZR2vN2qh5Q0OIJx31';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
    scope: "image",
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  })

app.get("/",function(req,res){
    var uploadToken=putPolicy.uploadToken(mac);
    res.json({"token":uploadToken});
});

console.log("监听路由开启");
//监听
app.listen(3000);
