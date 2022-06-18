const url = require("url");

function request(req) {
    //解析请求的url,将解析的信息挂载到req对象上
    const parsedUrl = url.parse(`${req.headers.host}${req.url}`, true);
    const keys = Object.keys(parsedUrl);
    keys.forEach((key) => (req[key] = parsedUrl[key]));
}

module.exports = request;