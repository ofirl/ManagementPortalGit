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
                name: 'Card name',
                accessor: 'cardName',
                type: 'text',
                width: 2,
                optional: false
            },
            {
                name: 'Username',
                accessor: 'username',
                type: 'text',
                width: 2,
                optional: false
            }
        ],
        outputs: [
            {
                name: 'Error',
                accessor: 'error'
            },
            {
                name: 'Message',
                accessor: 'msg'
            },
            {
                name: 'Previous Username',
                accessor: 'previousUsername'
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
        scriptId: 0,
        date: '29/3/2019',
        ranby: 0,
        results: [
            {
                success: false,
                input: {
                    id: 0,
                    cardName: 's7546559',
                    username: 'test1'
                },
                output: {
                    error: 'table was locked!',
                    msg: 'please try again later',
                    previousUsername: ''
                }
            },
            {
                success: true,
                input: {
                    id: 1,
                    cardName: 's7546559',
                    username: 'test2'
                },
                output: {
                    error: '',
                    msg: '',
                    previousUsername: 'test3'
                }
            }
        ]
    },
    {
        id: 1,
        scriptId: 0,
        date: '30/3/2019',
        ranby: 0,
        results: [
            {
                success: false,
                input: {
                    id: 0,
                    cardName: 's7546559',
                    username: 'ofirl'
                },
                output: {
                    error: 'table was locked!',
                    msg: 'please try again later',
                    previousUsername: ''
                }
            },
            {
                success: false,
                input: {
                    id: 1,
                    cardName: 's7546559',
                    username: 'ofirl'
                },
                output: {
                    error: '???',
                    msg: '',
                    previousUsername: 'shakedb'
                }
            },
            {
                success: true,
                input: {
                    id: 2,
                    cardName: 's7546559',
                    username: 'ofirl'
                },
                output: {
                    error: '???',
                    msg: '',
                    previousUsername: 'shakedb'
                }
            }
        ]
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