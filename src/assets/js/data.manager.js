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

function getProfileByUsernameAndPassword(username, password) {
    let allProfiles = StorageManager.loadProfileInfo();
    let requestedProfile = allProfiles.find( (p) => p.account.username.toLowerCase() === username.toLowerCase() && p.account.password === password );
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
    static getProfileByUsernameAndPassword = getProfileByUsernameAndPassword
    static getAllHistory = getAllHistory
    static getHistoryByProfileId = getHistoryByProfileId
}

// export { getScriptInfoById };