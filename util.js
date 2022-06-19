//parse parameters from paths, check if currentPath is valid 
function match(setupPath, currentPath) {
    const setupPathArray = setupPath.split("/");
    const currentPathArray = currentPath.split("/");
    const setupPathLength = setupPathArray.length;
    let match = true;
    let params = {};
    for (let i = 0; i < setupPathLength; i++) {
        if (setupPathArray[i].startsWith(":")) {
            params[setupPathArray[i].substring(1)] = currentPathArray[i];
        }
        else if (setupPathArray[i] === '*') {
            break;
        }
        else if (setupPathArray[i] !== currentPathArray[i]) {
            match = false;
            break;
        }
    }
    return match ? { matched: true, params: params } : { matched: false, params: null };
}
module.exports = { match };