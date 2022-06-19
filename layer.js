const { match: matchPath } = require('./util');
class Layer {
    /*
      Setting up path and handler
    */
    constructor(path, handler) {
        this.handler = handler;
        this.name = handler.name || "<anonymous>";
        this.path = path;
    }

    /*
      If the current request path matches the layer's path
      then handling for the current path
    */
    requestHandler(...args) {
        const handler = this.handler;
        handler ? handler(...args) : null;
    }

    /*
      To match current request path with 
      the path provided at the time of setup
  
      SETUP: app.get('/login', (req, res) => {})
      CURRENT REQUEST: GET /login
    */
    match(path) {
        return matchPath(this.path, path);
    }
}

module.exports = Layer;