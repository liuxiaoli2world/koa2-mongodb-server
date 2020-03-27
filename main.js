'use strict';

const path = require('path');
require('babel-register');
const Koa = require('koa');
const Static = require('koa-static');
const cors = require('koa2-cors');
const logger = require('koa-logger');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.keys = ['mongodb', 'mqtt'];
app.use(logger());
app.use(session(app));
app.use(bodyParser());

/**
 * 使用路由转发请求
 * @type {[type]}
 */
const router = require('./config/router')();
app.use(
  cors({
    origin: function(ctx) {
      // if (ctx.url === '/test') {
      //   return '*'; // 允许来自所有域名请求
      // }
      return 'http://192.168.1.108:8000'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
);

app.use(router.routes()).use(router.allowedMethods());
app.use(Static(path.join(__dirname, 'public')));

app.listen(1234);
console.log('服务已启动，请访问http://192.168.1.108:1234');
