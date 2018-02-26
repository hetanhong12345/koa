# 前后端分离
* 前端和后端代码分别部署在不同的服务器。
* 后端只需向前端提供json接口，接口只需返回请求正确或者失败原因。
* 前端在开发过程中不必等待后端提供接口，可先自行约定接口数据模型。
* 哪些网站适合前后端分离：
  - 网站前端变化远比端变化频繁
  - 网站前端团队和后端团队技能点差异大
  - 网站前端效果绚丽/跨设备兼容要求高
* 前后端分离主要有如下技术难点
  -  跨域请求
  - 身份认证

## 浏览器的同源策略
* 如果协议，端口和域名对于两个页面是相同的，则两个页面具有相同的源
* 同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。
这是一个用于隔离潜在恶意文件的关键的安全机制。

## 跨域 HTTP 请求
* 当一个资源从与该资源本身所在的服务器不同的源请求一个资源时，
资源会发起一个跨域 HTTP 请求。
* 出于安全考虑，浏览器会限制从脚本内发起的跨域HTTP请求。
* 也可能是跨站请求可以正常发起，但是返回结果被浏览器拦截了。
    * XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求。
    * Web 字体 (CSS 中通过 @font-face 使用跨域字体资源)。
    * 使用 drawImage 将 Images/video 画面绘制到 canvas。
    * Scripts (未处理的异常)。
    * 其他。。。
 ## 跨域资源共享（ CORS ）
  * 跨域资源共享（ CORS ）机制允许 Web 应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。
  * 浏览器支持在 API 容器中（例如 XMLHttpRequest 或 Fetch ）使用 CORS，以降低跨域 HTTP 请求所带来的风险。
  * CORS 需要客户端和服务器同时支持。目前，所有浏览器都支持该机制（IE 10 提供了对规范的完整支持，但在较早版本中，
   CORS 机制是借由 XDomainRequest 对象完成）。
   
```javascript
// client
// origin ：https://zj-static.zj-hf.cn
     var request = new XMLHttpRequest();
     var url = 'https://zj-weixin.zj-hf.cn/personalCenter';
     request.open('GET', url, true);
     request.onreadystatechange = handler;
     request.send(); 
```


```javascript
// server 
      res.header("Access-Control-Allow-Origin", '*');  // 允许所有域名访问
      res.header('Access-Control-Allow-Credentials', false); // 不携带身份信息
```

## 预检请求
*  “需预检的请求”要求必须先使用 OPTIONS方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。
* "预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。
* 下列情况下需先发送预检请求。
   * 使用了下面任一 HTTP 方法：PUT，DELETE，CONNECT，OPTIONS，TRACE，PATCH。
   * 人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：Accept，Accept-Language，Content-Language，Content-Type，DPR，Downlink，Save-Data，Viewport-Width，Width。
   * Content-Type 的值不属于下列之一:application/x-www-form-urlencoded，multipart/form-data，text/plain

```javascript

// client
// origin ：https://zj-static.zj-hf.cn

  var request = new XMLHttpRequest();
  var url = 'https://zj-weixin.zj-hf.cn/personalCenter';
  var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
   request.open('POST', url, true);
   request.setRequestHeader('X-PINGOTHER', 'pingpong');// 集合之外的header
   request.setRequestHeader('Content-Type', 'application/xml'); // 不是三种之一
   request.send(body); 
    
```

```javascript
 
 // server 
 // add cors middleware
     app.use(async (ctx, next) => {
         let origin = ctx.get('Origin');
         ctx.set('Access-Control-Allow-Origin', origin);
         ctx.set('Access-Control-Allow-Credentials', false);
         ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
         ctx.set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
         ctx.set('Access-Control-Max-Age', 24*60*60); // 设置预检请求缓存时间
         let method = ctx.method;
         if ('OPTIONS' === method) {
              ctx.status = 204;// 不返回任何实体
         }
         await  next();
     });
```

## 简单请求
* 某些请求不会触发 CORS 预检请求，称为简单请求。
* 简单请求必须满足下列条件。
   * 使用下列方法之一： GET，HEAD，POST
   * 不得人为设置该集合之外的其他首部字段。该集合为：
   Accept，Accept-Language，Content-Language，Content-Type，DPR，Downlink，Save-Data，Viewport-Width，Width。
   * Content-Type 的值仅限于下列三者之一：
   application/x-www-form-urlencoded，multipart/form-data，text/plain。
 * 简单请求将直接发送实际请求。
   
##  附带身份凭证的请求--cookie
*  CORS 的一个特性是，可以基于  HTTP cookies 和 HTTP 认证信息发送身份凭证。对于跨域 XMLHttpRequest 或 Fetch 请求，浏览器默认不会
   发送身份凭证信息。如果要发送凭证信息，需要设置 XMLHttpRequest 的某个特殊标志位--withCredentials。

```javascript
// client
// origin ：https://zj-static.zj-hf.cn
//  user login
   var request = new XMLHttpRequest();
   var url = 'https://zj-weixin.zj-hf.cn/login';
   var body = 'mobile=13720057698&password=hxx123456'; // application/x-www-form-urlencoded 
   request.open('POST', url, true);
   request.withCredentials = true; // 携带身份信息
   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 
   request.send(body); 

```

```javascript
// server 
user.login = async (ctx) => {
    let {body} = ctx.request;
    let {mobile, password} = body;
    let userInfo = await  new User({mobile, password}).fetch();
     ctx.set('Access-Control-Allow-Origin', 'https://zj-static.zj-hf.cn');
     ctx.set('Access-Control-Allow-Credentials', true);// 允许在response 里写入 cookie
     ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
     ctx.set('Access-Control-Allow-Headers', 'Content-Type');
     ctx.cookies.set(
          'cid', 
         userInfo,
          {
            domain: 'zj-hf.cn',  // 指定了需要发送Cookie的域名
            path: '/',       // 指定了需要发送Cooki的路径
            maxAge:60*60,   // 有效时长 
            expires: new Date('2018-02-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
          })
    return userInfo;
};
```

```javascript
// client
// origin ：https://zj-static.zj-hf.cn
//  get userInfo 

   var request = new XMLHttpRequest();
   var url = 'https://zj-weixin.zj-hf.cn/getUserInfo';
   request.open('GET', url, true);
   request.withCredentials = true; // 携带身份信息
   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 
   request.send(); 
```

```javascript

// server 
user.getInfo = async (ctx) => {
     ctx.set('Access-Control-Allow-Origin', 'https://zj-static.zj-hf.cn');
     ctx.set('Access-Control-Allow-Credentials', true);// 允许在response 里写入 cookie
     ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
     ctx.set('Access-Control-Allow-Headers', 'Content-Type');
     let userInfo = ctx.cookies.get('cid'); // 从cookie里读取用户信息
    return userInfo;
};
```

###  cookie 作为身份凭证： 
  * cookie认证流程 
    - 客户端根据用户名、密码或者验证码登录
    - 服务端验证正确之后将cookie设置到response里，同时将用户信息或者用户id储存到session中。

    ```javascript
      cookies.set('cid',encrypt);
      session.set(encrypt,userInfo)
    ```
    - 客户端发出携带cookie的请求
    - 服务端从cookie里取出cid，进行校验

     ```javascript
      let cid = ctx.cookies.get('cid')
      
      let userInfo = session.get(cid)
    ```
   
    - 校验成功后，返回相应数据
  * 使用cookie作为认证凭证有一些不方便，比如不能跨平台，当有多个客户端平台调用同一个服务端时，
  需要根据不同的平台设置不同的返回头部。
  
  ```javascript
    ctx.set('Access-Control-Allow-Origin', 'https://zj-static.zj-hf.cn');
    ctx.set('Access-Control-Allow-Origin', 'https://zj-static.zj-wm.cn');
  ```
  
  * 当服务端把用户信息清空之后（比如服务重启，清空redis等操作），用户登录状态消失。
  * 使用不当存在安全隐患([XSS攻击](https://baike.baidu.com/item/XSS%E6%94%BB%E5%87%BB/954065?fr=aladdin)和[CSRF攻击](https://en.wikipedia.org/wiki/HTTP_cookie#Cross-site_request_forgery))

##  附带身份凭证的请求--token

* 使用token验证方式，可以允许任何其他域名的请求访问。

```javascript
  ctx.set('Access-Control-Allow-Origin', '*');// 允许所有域名访问
```

* 客户端使用用户名跟密码请求登录
* 服务端收到请求，去验证用户名与密码
* 验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端

```javascript
    ctx.body = {
                code: 200,
                data:{token,userInfo},
                msg: 'ok'
            }
```

* 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里

```javascript
localStorage.setItem('auth_token',data.token);
```

* 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token

```javascript
 var request = new XMLHttpRequest();
 request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 
 request.setRequestHeader('X-Token', localStorage.getItem('auth_token')); // 
```

* 服务端收到请求，验证Token，如果成功，就向客户端返回请求的数据

```javascript
     ctx.set('Access-Control-Allow-Headers', 'Content-Type,X-Token');
     let  token = ctx.get('X-Token');
     verify(token);
```


