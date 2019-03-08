import StorageManager from "./storage.manager";

function getScriptInfoById(scriptId) {
    let allScriptsInfo = StorageManager.loadScriptsInfo();
    let requestedScript = allScriptsInfo.find( (s) => s.id === scriptId );
    return requestedScript;
}

function getProfileById(profileId) {
    let allProfiles = StorageManager.loadProfileInfo();
    let requestedProfile = allProfiles.find( (p) => p.id === profileId );
    return requestedProfile;
}

export default class DataManager {
    static getScriptInfoById = getScriptInfoById
    static getProfileById = getProfileById
}

// export { getScriptInfoById };