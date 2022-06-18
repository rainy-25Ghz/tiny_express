//build your own express server
let http=require("http");
let server=http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello World\n');
}
);
server.listen(3000);
console.log('Server running at http://localhost:3000/');
