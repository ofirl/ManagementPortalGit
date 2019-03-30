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

function getAllHistory() {
    let allHistory = StorageManager.loadHistoryInfo();
    return allHistory;
}

function getHistoryByProfileId(profileId) {
    let allHistory = StorageManager.loadHistoryInfo();
    let requestedHistory = allHistory;
    return requestedHistory;
}

export default class DataManager {
    static getScriptInfoById = getScriptInfoById
    static getProfileById = getProfileById
    static getAllHistory = getAllHistory
    static getHistoryByProfileId = getHistoryByProfileId
}

// export { getScriptInfoById };