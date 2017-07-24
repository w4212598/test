# 租房客项目

> 该项目为面试展示作品,前后端均由本人编写。

## 项目概述

``` bash
该项目前端代码部分由vue2.js框架构建，使用vue-cli脚手架建立项目模板，vue-router作为单页面应用的路由跳转插件，由vue-cookie保存登陆cookie信息，

遵循模块化原则 APP中每个部分通过vue-router分开编写

页面效果部分：所有页面内JS代码部分都使用jquery编写,视图中所有图标均为iconfont css引入，同时采用vue2.js的UI框架 mint-ui 美化页面设计，地图部分引入了vue-amap

构建工具使用cordova对webapp进行打包
``` bash
## 功能介绍
以下为已完成的功能；
# 欢迎页

使用jquery fadeIn 淡入淡出文字，5秒计数使用了两个setTimeout，5秒后执行jquery css()方法改变visibilty:hidden

# '租房'

1、通过jquery ajax 请求获取所有房源信息，每次请求限制加载3条数据(通过MYSQL语句中的LIMIT OFFSET实现,拉至底部后继续加载

2、房源搜索页同样通过前后端交互进行关键字模糊查询(%$value%)

3、房间详情通过 左外联多表联询 传入 公寓ID 房间ID 先查询属于该公寓的所有房间(测试版每个公寓固定为两个房间),通过数据表中的status字段判断是否已租(测试版固定为一
个已租一个未租），下方推荐页面使用了MYSQL随机查询2条数据。 地图部分使用vue-amap插件，可以自动定位当前位置。

#  '订单'

无功能

#  '讨论'

1.’所有‘ 通过ajax请求绑定数据加载所有文章。带下拉加载功能。

2.’我的‘ 通过获取当前登录用户的cookie信息加载作者为当前用户的文章。

3.’查询‘ 同理房屋查询。

4.’发表文章‘ 通过ajax请求向数据库POST文章数据(验证当前是否有cookie,登陆后才可以发送)，图片部分使用了HTML5 FlieReader将上传的图片转化为base64图片流上传至后端,同时
用canvas生成一个本地预览图；

5. ‘文章详情’ 通过文章id查询该篇文章的详细信息以及属于该文章的所有评论，点赞功能不在赘述，点击回复该搂弹出回复框，使用了 jquery animate 实现动画效果，评论区点击最
新回复对 所有评论 按照时间降序排列('order by DESC')

*如果验证到当前登陆用户和 文章/评论作者相同(用户名字段)，则显示 删除 选项，由后端进行删除操作.

#  '用户'

该模块主要功能为登录、注册、用户信息修改、退出登录

*该模块主路由通过判断是否存在cookie,若存在则显示用户信息页，若不存在则显示登陆页

1、注册 通过ajax向服务器端发起请求，通过后端返回的status字段判断以下几种情况：

用户名已存在 邮箱已存在 超时 注册成功，注册成功后通过$router.push跳转至登陆页

2、登录 通过ajax向服务器端发起请求，通过后端返回的status字段判断以下几种情况：
用户名或密码错误 超时 登陆成功

*若登陆成功 则通过vue-router创建一个cookie,在需要cookie作为访问权限的页面get该cookie的信息

3、用户详情页

实现了 当前用户详细信息、密码修改、账号注销、退出登录、发表文章数 这几个功能.


## 后端部分

由自己模拟当时正式开发环境编写，使用了PHP Yii2框架，根据前后端交互需要实现了MYSQL数据库的 增 删 查 改功能。
建立三个controller分别对用户、文章、房间信息进行具体操作，详情见后端具体代码

## 备注

后端通过wampsever apache建立本地虚拟域名，再用NATAPP内网穿透功能模拟正式服务器环境。

张一弛
