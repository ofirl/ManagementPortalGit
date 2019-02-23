var data = {
    scripts: {
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

function loadScriptsInfo() {
    if (data.scripts.loaded)
        return data.scripts.value;

    data.scripts.value = testScriptsArray;

    return data.scripts.value;
}

export default class StorageManager {
    static loadScriptsInfo = loadScriptsInfo;
}