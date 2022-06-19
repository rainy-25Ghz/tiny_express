const http = require('http');
const request = require('./request');
const response = require('./response');
const { match } = require('./util');
const Router = require('./router');
function TinyExpress() {
    //Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle
    const middlewares = [];
    const router = new Router();

    function getPathAndHandler(args) {
        let path = '*';//默认所有路由都会执行中间件
        let handler = null;//中间件处理函数

        if (args.length === 2) [path, handler] = args;
        else handler = args[0];

        if (typeof path !== 'string') throw new Error('Path needs to be a string');
        else if (typeof handler !== 'function') throw new Error('Middleware needs to be a function');

        return {
            path,
            handler
        }

    }

    function use(...args) {
        const { path, handler } = getPathAndHandler(args);

        //存储处理函数以及对应路径到一个数组中
        middlewares.push({
            path,
            handler
        });
    }

    //处理请求
    function handle(req, res, cb) {
        const next = getNext(req, res);//获取下一个中间件函数
        req.handler = cb;
        next();
    }

    //获取下一个中间件函数
    function getNext(req, res) {
        let index = 0;
        const next = () => {
            const middleware = middlewares[index++];
            if (!middleware) return;
            const { matched, params } = match(middleware.path, req.path);

            if (matched) {
                req.params = params;
                middleware.handler(req, res, next);
            } else if (index < middlewares.length) {
                //如果当前路径不匹配，则继续查找下一个中间件
                next();
            }
            else {
                req.handler(req, res);
            }
        }
        return next;
    }

    function get(...args) {
        const { path, handler } = getPathAndHandler(args);
        return router.get(path, handler);
    }

    function post(...args) {
        const { path, handler } = getPathAndHandler(args);
        return router.post(path, handler);
    }

    function listen(port = 8080, callback) {
        return http
            .createServer((req, res) => {
                request(req);
                response(res);
                handle(req, res, () => router.handle(req, res));
            })
            .listen({ port }, () => {
                if (callback) {
                    if (typeof callback === 'function') {
                        return callback();
                    }
                    throw new Error('Listen callback needs to be a function');
                }
            });
    }
    return { listen, use, get, post }
}

module.exports = TinyExpress;