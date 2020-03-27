const Router = require('koa-router');
const DB = require('../app/dbhelper/db');

module.exports = function() {
  var router = new Router({
    prefix: '/api'
  });

  router.get('/equipments', async ctx => {
    var result = await DB.find('equipments', {});
    ctx.body = result;
  });

  return router;
};
