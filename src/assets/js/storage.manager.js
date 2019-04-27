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
        account: {
            username: 'ofirl',
            password: 'password'
        },
        personalization: {
            logondata: [
                {
                    id: 0,
                    name: 'CRM Dev',
                    username: 'OFIRL',
                    system: 'CKD'
                },
                {
                    id: 1,
                    name: 'CRM Test',
                    username: 'OFIRL',
                    system: 'CKT'
                },
                {
                    id: 2,
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
        date: '4/12/2019, 02:47:00 PM',
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
                    msg: [
                        {
                            type: 'error',
                            text: 'table was locked!'
                        },
                        {
                            type: 'info',
                            text: 'please try again'
                        }
                    ],
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
                    msg: [],
                    previousUsername: 'test3'
                }
            }
        ]
    },
    {
        id: 1,
        scriptId: 0,
        date: '4/14/2019, 12:45:00 PM',
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
                    msg: [
                        {
                            type: 'error',
                            text: 'table was locked!'
                        },
                        {
                            type: 'info',
                            text: 'please try again'
                        }
                    ],
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
                    msg: [
                        {
                            type: 'error',
                            text: '???'
                        }
                    ],
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
                    msg: [
                        {
                            type: 'error',
                            text: 'table was locked!!!'
                        },
                        {
                            type: 'warning',
                            text: 'please try again later'
                        }
                    ],
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