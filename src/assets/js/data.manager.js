import StorageManager from "./storage.manager";

function getScriptInfoById(scriptId) {
    let allScriptsInfo = StorageManager.loadScriptsInfo();
    let requestedScript = allScriptsInfo.find( (s) => s.id == scriptId );
    return requestedScript;
}

export default class DataManager {
    static getScriptInfoById = getScriptInfoById
}

// export { getScriptInfoById };