const Koa = require('koa');  
const cors = require('koa-cors'); 
const bodyParser = require('koa-bodyparser'); //引入bodyparser, 解析原始request请求body参数，绑定到ctx.request.body
const controller = require('./utils/controller'); // 引入控制器(controller)工具,扫描添加中间件
const rest = require('./utils/rest'); // 引入restApi封装工具,增加/api/前缀,绑定rest()方法
const app = new Koa();

app.use(cors()); // 解决跨域问题

// 打印request URL的日志:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());// 解析原始request的body参数:
app.use(rest.restify()); // 绑定 rest() 到ctx对象:
app.use(controller()); // 添加控制器 ( controllers ),创建api访问路由:

app.listen(30001); // 监听端口
console.log('app started at port 30001...');