var data = {
    scripts: {
        value: []
    },
    profiles: {
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
    }
];

var testProfilesArray = [
    {
        id: 0,
        firstname: 'ofir',
        lastname: 'levi',
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

export default class StorageManager {
    static loadScriptsInfo = loadScriptsInfo;
    static loadProfileInfo = loadProfileInfo;
}