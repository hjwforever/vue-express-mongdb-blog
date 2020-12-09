* [Front\-End of Vue\-Express\-MongoDB\-Blog by hjwforever](#front-end-of-vue-express-mongodb-blog-by-hjwforever)
  * [Project setup](#project-setup)
    * [Compiles and hot\-reloads for development](#compiles-and-hot-reloads-for-development)
    * [Compiles and minifies for production](#compiles-and-minifies-for-production)
    * [Lints and fixes files](#lints-and-fixes-files)
    * [Customize configuration](#customize-configuration)
  * [项目结构](#项目结构)
  * [部分界面预览](#部分界面预览)
    * [注册界面](#注册界面)
    * [登录界面](#登录界面)
    * [个人信息界面](#个人信息界面)
    * [主页界面](#主页界面)
      * [主页](#主页)
      * [文章列表随页面向下滚动不断加载](#文章列表随页面向下滚动不断加载)
      * [点赞文章及主页文章列表加载完毕](#点赞文章及主页文章列表加载完毕)
    * [文章管理界面](#文章管理界面)
      * [界面](#界面)
      * [发表新文章](#发表新文章)
      * [编辑已有文章](#编辑已有文章)
      * [普通账户没有管理员权限进行 删除或更新文章](#普通账户没有管理员权限进行-删除或更新文章)
      * [文章列表分页](#文章列表分页)


# Front-End of Vue-Express-MongoDB-Blog by hjwforever
**[示例网站](http://blog.aruoxi.top)**
 >本项目为纯前端项目, 后端项目可移步[vue-express-mongdb-blog-server](https://github.com/hjwforever/vue-express-mongdb-blog-server), 前后端整合对接版本可移步[vue-express-mongdb-blog-server/release](https://github.com/hjwforever/vue-express-mongdb-blog-server/tree/release)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目结构
思维导图下载链接：
[前端项目结构思维导图](https://devcloud.cn-north-4.huaweicloud.com/codehub/v1/devcloud/682618/repository/blobs/fc578af7949921d8fa84d5a2815f7f15c7be8716/downloadFile?filepath=tree.xmind)
```
├─.gitignore 
├─babel.config.js 
├─build --------------------- // build后的文件导出目录
├─package-lock.json 
├─package.json 
├─public 
│ ├─favicon.ico 
│ └─index.html 
├─README.md 
├─src 
│ ├─App.vue 
│ ├─assets 
│ │ ├─bg.jpg 
│ │ └─logo.png 
│ ├─components -------------- // Vue组件
│ │ ├─Footer.vue ------------ // 页脚组件
│ │ ├─Home.vue -------------- // 主页
│ │ ├─Infinite -------------- // 无限加载模块(随页面滚动无限从服务器数据库加载文章)
│ │ │ ├─Error.vue ----------- // 向服务器请求文章出错
│ │ │ ├─NoMore.vue ---------- // 当没有更多文章后显示提示
│ │ │ ├─NoResults.vue ------- // 请求没有结果时提示
│ │ │ └─PostItem.vue -------- // 文章列表中的文章组件
│ │ ├─Post.vue -------------- // 组件， 编辑文章
│ │ ├─PostDialogFrom.vue ---- // 组件， 添加新文章
│ │ ├─PostsList.vue --------- // 文章管理界面
│ │ └─Snackbar.vue ---------- // 已全局注册的消息组件，显示为可自定义文本、颜色、时间的顶部小消息条
│ ├─http.js ----------------- // axios，定义API请求的基路由及请求头
│ ├─main.js ----------------- // 入口文件，全局注册众多组件，如vuetify组件(本项目使用的UI框架)、Infinite组件(页面滚动无限加载模块）、Snackbar.send（自行封装及全局注册的顶部消息条）、VueSweetalert2(确认框组件)等等
│ ├─models ------------------ // 模型文件类
│ │ └─user.js --------------- // 用户Model
│ ├─plugins ----------------- // 插件
│ │ └─vuetify.js ------------ // vuetify(本醒目使用的UI框架)
│ ├─router ------------------ // 路由文件, 包括重定向等
│ │ └─index.js 
│ ├─services ---------------- // 服务模块， 用于登录验证（包括有效期为24小时的accessToken）、请求文章的方法等
│ │ ├─auth-header.js -------- // 定义登录、注册及登出的axios请求方法
│ │ ├─auth.service.js ------- // 设置登录注册请求头
│ │ ├─PostDataService.js ---- // 定义基于axios请求的对文章的各种请求服务
│ │ └─user.service.js ------- // 用户服务，对应账户的不同类型，如user、admin等
│ ├─store ------------------- // 全局存储模块
│ │ ├─auth.module.js -------- // 登录、注册状态
│ │ ├─index.js -------------- // 入口文件
│ │ └─snackbar.module.js ---- // 定义消息条基本函数，以用于之后全局注册及使用
│ └─views ------------------- // 视图模块
│   ├─BoardUser.vue --------- // 用户界面，即为文章管理界面(注意删除及更新已有文章需要管理员权限)
│   ├─Login.vue ------------- // 登录界面
│   ├─Profile.vue ----------- // 个人信息界面，显示部分token、id、用户名、邮箱及已授权权限(所有已注册账户都有user权限，但admin等高级权限才可以在前端界面进行删除或修改文章)
│   └─Register.vue ---------- // 注册界面
└─vue.config.js ------------- // vue配置文件，配置了前端运行端口以及申明转译依赖：(vuetify，本项目所使用的UI框架）
```
## 部分界面预览
### 注册界面
![注册界面](http://img.aruoxi.top/vue-express-blog/image/%E6%B3%A8%E5%86%8C%E7%95%8C%E9%9D%A2.png)
### 登录界面
![注册界面](http://img.aruoxi.top/vue-express-blog/image/%E6%B3%A8%E5%86%8C%E7%95%8C%E9%9D%A2.png)
### 个人信息界面
![个人信息界面](http://img.aruoxi.top/vue-express-blog/image/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF.png)
### 主页界面
  #### 主页
  ![主页](http://img.aruoxi.top/vue-express-blog/image/%E4%B8%BB%E9%A1%B5.png)
  #### 文章列表随页面向下滚动不断加载
  ![不断加载](http://img.aruoxi.top/vue-express-blog/image/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E9%9A%8F%E9%A1%B5%E9%9D%A2%E6%BB%9A%E5%8A%A8%E4%B8%8D%E6%96%AD%E5%8A%A0%E8%BD%BD.png)
  #### 点赞文章及主页文章列表加载完毕
  ![点赞文章](http://img.aruoxi.top/vue-express-blog/image/%E4%B8%BB%E9%A1%B5%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E5%8F%8A%E7%82%B9%E8%B5%9E%E6%96%87%E7%AB%A0.png)
### 文章管理界面
  #### 界面
  ![文章管理](http://img.aruoxi.top/vue-express-blog/image/%E6%96%87%E7%AB%A0%E7%AE%A1%E7%90%86.png)
  #### 发表新文章
  ![发表新文章](http://img.aruoxi.top/vue-express-blog/image/%E6%B7%BB%E5%8A%A0%E6%96%B0%E6%96%87%E7%AB%A0.png)
  #### 编辑已有文章
  ![编辑已有文章](http://img.aruoxi.top/vue-express-blog/image/%E7%BC%96%E8%BE%91%E6%96%87%E7%AB%A0.png)
  [编辑文章](http://img.aruoxi.top/vue-express-blog/image/editPost.png)
  #### 普通账户没有管理员权限进行 删除或更新文章
  ![普通账户](http://img.aruoxi.top/vue-express-blog/image/%E9%9D%9E%E7%AE%A1%E7%90%86%E5%91%98%E7%9A%84%E8%B4%A6%E6%88%B7%E6%B2%A1%E6%9C%89%E6%9D%83%E9%99%90%E5%88%A0%E9%99%A4%E6%96%87%E7%AB%A0.png)
  [图片1](http://img.aruoxi.top/vue-express-blog/image/%E9%9D%9E%E7%AE%A1%E7%90%86%E5%91%98%E7%9A%84%E8%B4%A6%E6%88%B7%E6%B2%A1%E6%9C%89%E6%9D%83%E9%99%90%E5%88%A0%E9%99%A4%E6%96%87%E7%AB%A0.png)
  ![普通账户](http://img.aruoxi.top/vue-express-blog/image/%E9%9D%9E%E7%AE%A1%E7%90%86%E5%91%98%E7%9A%84%E8%B4%A6%E6%88%B7%E6%B2%A1%E6%9C%89%E6%9D%83%E9%99%90%E6%9B%B4%E6%96%B0%E6%96%87%E7%AB%A0.png)
  [图片2](http://img.aruoxi.top/vue-express-blog/image/%E9%9D%9E%E7%AE%A1%E7%90%86%E5%91%98%E7%9A%84%E8%B4%A6%E6%88%B7%E6%B2%A1%E6%9C%89%E6%9D%83%E9%99%90%E6%9B%B4%E6%96%B0%E6%96%87%E7%AB%A0.png)
  #### 文章列表分页
  ![文章列表分页](http://img.aruoxi.top/vue-express-blog/image/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E5%88%86%E9%A1%B5.png)
  [文章列表分页](http://img.aruoxi.top/vue-express-blog/image/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E5%88%86%E9%A1%B5.png)
