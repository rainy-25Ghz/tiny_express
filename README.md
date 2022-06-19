# tiny_express
模仿express.js的极简nodejs 后端框架
测试案例：
``` js
const TinyExpress = require("./tinyExpress");
const cors = require("cors");
const fs = require('fs');
const path = require('path');


const CONFIG = {
    PORT: 8080,
}
const app = new TinyExpress();
app.use("/test", cors());

app.use("/test", (req, res, next) => {
    res.send("test page");
    res.end();
});
app.use("/about/:username", (req, res, next) => {
    res.send("username is " + req.params.username);
    res.end();
});
app.get("/test2", (req, res) => {
    res.send("test2 get");
})
app.post("/test2", (req, res) => {
    res.send("test2 post");
    req.on("data", (chunk) => {
        console.log(chunk.toString());
    })
})
app.get('/', (req, res) => {
    fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
        if (err) {
            return res.status(500).send('Error Occured');
        }
        return res.status(200).send(data);
    });
});

const server = app.listen(CONFIG.PORT, () => { console.log(`Server running on ${CONFIG.PORT}`) })
```
