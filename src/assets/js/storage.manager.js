var data = {
    scripts: {
        value: []
    },
    profiles: {
        value: []
    },
    history: {
        value: []
    }
}

var testScriptsArray = [
    {
        id: 0,
        name: 'Add User Mapping',
        description: 'Adds a mapping for the user in table "vusrextid"',
        inputs: [
            {
                name: 'card name',
                type: 'text',
                width: 2,
                optional: false
            },
            {
                name: 'username',
                type: 'text',
                width: 2,
                optional: false
            }
        ]
    },
    {
        id: 1,
        name: 'Add User Mapping2',
        description: 'Adds a mapping for the user in table "vusrextid"',
        inputs: [
            {
                name: 'card name',
                type: 'text',
                width: 2,
                optional: false
            },
            {
                name: 'username',
                type: 'text',
                width: 2,
                optional: false
            }
        ]
    }
];

var testProfilesArray = [
    {
        id: 0,
        firstname: 'Ofir',
        lastname: 'Levi',
        birthday: '24/01/1993',
        personalization: {
            logondata: [
                {
                    name: 'CRM Dev',
                    username: 'OFIRL',
                    system: 'CKD'
                },
                {
                    name: 'CRM Test',
                    username: 'OFIRL',
                    system: 'CKT'
                },
                {
                    name: 'CRM Prod',
                    username: 'OFIRL',
                    system: 'CKP',
                    default: true
                }
            ]
        }
    }
];

var testHistoryArray = [
    {
        id: 0,
        script: 0,
        date: '29/3/2019',
        ranby: 0
    },
    {
        id: 1,
        script: 0,
        date: '30/3/2019',
        ranby: 0
    }
];

function loadScriptsInfo() {
    if (data.scripts.loaded)
        return data.scripts.value;

    // TODO: load data
    data.scripts.value = testScriptsArray;
    data.scripts.loaded = true;

    return data.scripts.value;
}

function loadProfileInfo() {
    if (data.profiles.loaded)
        return data.profiles.value;

    // TODO: load data
    data.profiles.value = testProfilesArray;
    data.profiles.loaded = true;

    return data.profiles.value;
}

function loadHistoryInfo() {
    if (data.history.loaded)
        return data.history.value;

    // TODO: load data
    data.history.value = testHistoryArray;
    data.history.loaded = true;

    return data.history.value;
}

export default class StorageManager {
    static loadScriptsInfo = loadScriptsInfo
    static loadProfileInfo = loadProfileInfo
    static loadHistoryInfo = loadHistoryInfo
}