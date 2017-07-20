/**
 * Created by john on 2017/7/17.
 */
var bodyParser=require('body-parser');
var express=require("express");
var busboy=require("connect-busboy");
var websocketServer=require("./server/websocket-server");
let cookieParser = require('cookie-parser');
let session = require("express-session");
//调用express方法，将返回值express对象赋值给app变量
var app=express();
app.all("*",function (req,res,next) {
  res.header("Access-Control-Allow-Origin","*");
  next()

});
var httpServer=websocketServer.initalWebsocket(app);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(busboy());
app.use(cookieParser());
var router=express.Router();
router.get("/students",function(req,res){


});
//将动态资源的路径设置为静态资源路径，可以将动态资源伪装为静态资源
router.get("/User/details.html",function (req, res) {
  var result="<div><h1>服务器端html字符串</h1></div>";
  //设置服务器端响应内容的类型
  res.setHeader("Content-Type",
    'text/html;charset="UTF-8');
  res.write(result);
  //关闭本次http连接
  res.end()
});
//引入自定义userDB模块，将其exports对象赋值给userDB变量
var userDb=require('./server/proceed/user');
userDb.init(router);
var docDb=require('./server/proceed/document');
docDb.init(router);

app.use("/",router);
app.use("/",express.static(__dirname));
var port=8106;
httpServer.listen(port,function (socket) {
  console.log("server is running on"+port);

});
