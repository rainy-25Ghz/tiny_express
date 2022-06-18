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
    // next();
});

app.use("/", (req, res, next) => {
    fs.readFile(path.resolve(__dirname, "public", "index.html"), (err, data) => {
        if (err) {
            res.status(500).send("Error ");
            return next();
        }
        res.status(200).send(data);
        return next();
    });
});

const server = app.listen(CONFIG.PORT, () => { console.log(`Server running on ${CONFIG.PORT}`) })