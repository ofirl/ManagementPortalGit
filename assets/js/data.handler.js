/* #region Constants */
// Consts
const sidebarContainer = 'sidebarCollapse';
const inputDataTableContainer = 'inputDataTableContainer';
const inputDataList = 'inputDataList';

/* #endregion */

// Input Data
var selectedScriptIndex = 0;
var currentScript = {};
var inputListOptions = {
    valueNames: [
        'status',
        { data: ['id'] }
    ]
    // items: [{'card-name': 'test', 'username': 'testing', 'status':'warning'}]
};
var inputList;
var inputListItemCounter = 0;
var currentSort = {
    column: '',
    order: ''
}
var currentFilter = [
    // {
    //     column: '',
    //     value: ''
    // }
];
var currentSearch = '';

// Execution Result
var isExecuting = false;
// testing - will be loaded with the result script
var executionResult = {
    // timestamp: '123',
    // results: [
    //     {
    //         id: 1,
    //         success: true,
    //         desc: ''
    //     },
    //     {
    //         id: 2,
    //         success: false,
    //         desc: 'error description'
    //     }
    // ]
};

// Profile data
var currentProfile;

/* Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions */
/* #region Helper Functions */

Element.prototype.addClass = function (className) {
    this.classList.add(className);
    return this;
}

Element.prototype.removeClass = function (className) {
    this.classList.remove(className);
    return this;
}

Element.prototype.insertAsFirstChild = function (childElement) {
    this.insertBefore(childElement, this.firstChild);
}

//Returns true if it is a DOM node
function isNode(o) {
    return (
        typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    );
}

//Returns true if it is a DOM element    
function isElement(o) {
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    );
}

// if (userProfiles) {
//     userProfiles.forEach((p) => p.fullName = function () {
//         return this.personal.first_name + ' ' + this.personal.last_name;
//     });
// }

function searchList(list, value, isNotFuzzy) {
    isNotFuzzy = isNotFuzzy || false;
    currentSearch = value;
    if (isNotFuzzy)
        list.search(value)
    else
        list.fuzzySearch(value);
}

/* #endregion */
/* Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions */

/* Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation */
/* #region Menu Creation */

function createMenu(menuData, parentElement) {
    // creating the menu
    let menuElement = document.createElement('ul');

    // default menu = main menu
    if (!parentElement) {
        parentElement = document.querySelector('#' + sidebarContainer);
        menuElement.addClass('navbar-nav');
    }
    // sub menu
    else {
        menuElement.addClass('nav');
        menuElement.addClass('nav-sm');
        menuElement.addClass('flex-column');
    }

    // for each menu item
    for (let index = 0; index < menuData.length; index++) {
        const menuObject = menuData[index];

        // create a menu item (<li>)
        let menuItem = document.createElement('li');
        menuItem.addClass('nav-item');
        menuElement.append(menuItem);

        // create a menu link (<a>)
        let menuLink = document.createElement('a');
        menuLink.addClass('nav-link');

        // create a feather icon (<i>)
        if (menuObject.featherIcon) {
            let featherIcon = document.createElement('i');
            featherIcon.addClass('fe');
            featherIcon.addClass('fe-' + menuObject.featherIcon);

            menuLink.append(featherIcon);
        }

        // enter text
        menuLink.innerHTML += menuObject.name;

        // create a badge (<span>)
        if (menuObject.badge || menuObject.badgeText) {
            let badge = document.createElement('span');
            badge.addClass('badge');
            badge.addClass('badge-' + menuObject.badge);
            badge.addClass('ml-auto');
            badge.innerHTML = menuObject.badgeText;

            menuLink.append(badge);
        }
        menuItem.append(menuLink);

        if (menuObject.children) {
            menuLink.setAttribute('href', '#' + menuObject.href);
            menuLink.setAttribute('data-toggle', 'collapse');
            menuLink.setAttribute('role', 'button');
            menuLink.setAttribute('aria-expanded', 'false');
            menuLink.setAttribute('aria-controls', menuObject.href);

            let subMenu = document.createElement('div');
            subMenu.addClass('collapse');
            subMenu.id = menuObject.href;
            createMenu(menuObject.children, subMenu);

            menuItem.append(subMenu);
        }
        else {
            menuLink.setAttribute('href', menuObject.href);
        }
    }

    parentElement.insertBefore(menuElement, parentElement.firstChild);
}

function loadMenusFromFile() {
    createMenu(menuJson.menu);
    var navbars = $(".navbar-nav, .navbar-nav .nav");
    var collpaseElements = $(".navbar-nav .collapse");
    collpaseElements.on({
        "show.bs.collapse": function () {
            var a;
            (a = $(this)).closest(navbars).find(collpaseElements).not(a).collapse("hide")
        }
    });
}

/* #endregion */
/* Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation */

/* Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data */
/* #region Input Data */

function createInputDataTable(list, tableContainer, noActions, isLabel, additionalColumns) {
    if (list == undefined && list != null) {
        inputList = null;
        return createInputDataTable(inputList, tableContainer, noActions);
    }
    noActions = noActions || false;
    isLabel = isLabel || false;

    if (!tableContainer)
        tableContainer = document.querySelector('#' + inputDataTableContainer);

    // data-lists-values for sorting
    let inputFields = [];
    scriptsArray[selectedScriptIndex].inputs.forEach(input => {
        inputFields.push(input.name.replace(' ', '-'));
    });
    inputFields.push('status');
    tableContainer.setAttribute('data-lists-values', '[' + inputFields.join(',') + ']');

    // table header cells
    let totalWidth = 2;
    let headerRow = tableContainer.querySelector('thead tr');
    scriptsArray[selectedScriptIndex].inputs.concat(additionalColumns).forEach(input => {
        let headerCell = document.createElement('th');
        headerCell.addClass('col-' + input.width);
        totalWidth += input.width;

        // let headerCellLink = document.createElement('a');
        // headerCellLink.setAttribute('href', '#!');
        // headerCellLink.addClass('text-muted');
        // headerCellLink.addClass('sort');
        // headerCellLink.setAttribute('data-sort', input.name.replace(' ', '-'));
        // headerCellLink.innerText = input.name;
        // headerCellLink.setAttribute('onclick', 'onclick="updateSorting.call(this);"');

        headerCell.innerHTML = '<a href="#!" class="text-muted sort" data-sort="' + input.name.replace(' ', '-') + '" ' +
            'onclick="updateSorting.call(this);">' + input.name + '</a>';

        // headerCell.append(headerCellLink);
        headerRow.insertBefore(headerCell, headerRow.querySelector('[data-sort=status]').parentElement);

        let inputOption;
        if (!isLabel) {
            inputOption = {
                name: input.name.replace(' ', '-'),
                attr: 'value'
            };
        }
        else {
            inputOption = input.name.replace(' ', '-');
        }

        inputListOptions.valueNames.push(inputOption);
    });

    // total card width
    // tableContainer.parentElement.addClass('col-' + totalWidth);

    // add one new empty row
    addNewRow(null, tableContainer, noActions, isLabel, additionalColumns);

    // Init list
    list = new List(tableContainer.id, inputListOptions);
    list.clear();
    // addNewRow(list, tableContainer, noActions);

    // applySorting(list, currentSort = { column: list.valueNames[2].name, order: 'asc' });

    return list;
}

function addNewRowClick() {
    addNewRow(inputList, document.querySelector(this.dataset.target));
}

function addNewRow(list, table, noActions, isLabel, additionalColumns) {
    if (list == undefined)
        list = inputList;

    isLabel = isLabel || false;
    additionalColumns = additionalColumns || [];
    noActions = noActions || false;

    if (list) {
        // console.log(list);
        let listItem = list.valueNames.reduce(function (acc, cur) {
            if (cur.data)
                acc[cur.data[0]] = '';
            else if (cur.name)
                acc[cur.name] = '';
            else
                acc[cur] = '';

            return acc;
        }, {});
        
        listItem.id = getNextInputListItemId();

        list.add(listItem);
        $(table.querySelectorAll('[data-toggle="tooltip"]')).tooltip();
        updateStatus(table.querySelector('tbody').lastElementChild);
        return;
    }

    let inputListItem = {};
    let row = document.createElement('tr');
    let rowId = getNextInputListItemId();
    row.setAttribute('data-id', rowId);
    row.setAttribute('id', rowId);
    scriptsArray[selectedScriptIndex].inputs.concat(additionalColumns).forEach(input => {
        let cellClass = input.name.replace(' ', '-');
        let cellInputType = input.type;
        let cellPlaceHolder = input.name;

        if (!isLabel) {
            row.innerHTML += '<td>' +
                '<input type="' + cellInputType + '" class="form-control form-control-flush h-100 bw-flush-1 ' + cellClass + '" placeholder="' + cellPlaceHolder + '" value=""' +
                'oninput="inputDataChanged.call(this);"> </td>';
        }
        else {
            row.innerHTML += `<td> <span class="${cellClass}"> </span> </td>`;
        }
        inputListItem[input.name.replace(' ', '-')] = '';
    });

    row.innerHTML += '<td> <span data-role="icon" class="text-warning">●</span> <span class="status"' +
        'data-toggle="tooltip" data-html="true" title=""> Pending </span> </td>';

    if (!noActions) {
        row.innerHTML +=
            '<td class="text-center"> <span class="fe fe-trash-2 mr-1 pointer" onclick="deleteRowClick.call(this)"' +
            'data-toggle="tooltip" data-placement="top" data-html="true" title="Delete row"> </span>' +
            '<span class="fe fe-copy pointer" onclick="copyRowClick.call(this)" data-toggle="tooltip"' +
            'data-placement="top" data-html="true" title="Copy row"> </span> </td>';
    }

    row.innerHTML += '</tr>';

    inputListItem['status'] = 'Warning';

    table.querySelector('tbody').append(row);
    updateStatus(row);
}

function copyRowClick() {
    // copyRow(this.parentElement.parentElement);
    let item = inputList.copyItem('id', this.parentElement.parentElement.dataset.id);
    updateStatus(item.elm);
    $(item.elm.querySelectorAll('[data-toggle="tooltip"]')).tooltip();
    // applySorting(inputList);
    inputList.applyCurrentSort();
}

// function copyRow(originalRow) {
//     let newRow = {};
//     let originalItem = inputList.get('id', originalRow.dataset.id)[0]._values;
//     for (var property in originalItem) {
//         if (originalItem.hasOwnProperty(property)) {
//             newRow[property] = originalItem[property]
//         }
//     }
//     newRow.id = getNextInputListItemId();
//     inputList.add(newRow);
//     updateStatus(originalRow.parentElement.lastElementChild);
//     $(originalRow.parentElement.lastElementChild.querySelectorAll('[data-toggle="tooltip"]')).tooltip();

//     applySorting(inputList);
// }

function deleteRowClick() {
    deleteRow(this.parentElement.parentElement);
}

function deleteRow(row) {
    inputList.remove('id', row.dataset.id);
}

function inputDataChanged() {
    let changedValueId = [].slice.apply(this.classList).filter(function (x) {
        return inputList.valueNames.reduce(function (acc, cur) {
            if (cur.data)
                acc = acc || cur.data[0] == x;
            else if (cur.name)
                acc = acc || cur.name == x;
            else
                acc = acc || cur == x;

            return acc;
        }, false);
    });

    let listItem = inputList.get('id', this.parentElement.parentElement.dataset.id)[0];
    listItem._values[changedValueId] = this.value;

    updateStatus(this.parentElement.parentElement);
}

function getNextInputListItemId() {
    return inputListItemCounter++;
}

function getInputDataArray() {
    let inputDataArray = [];
    let inputs = scriptsArray[selectedScriptIndex].inputs.reduce(function (acc, cur) {
        acc.push(cur.name.replace(' ', '-'));
        return acc;
    }, []);

    inputList.items.forEach(item => {
        let dataRow = [];
        inputs.forEach(input => {
            dataRow.push(item._values[input]);
        });
        inputDataArray.push(dataRow);
    });

    return inputDataArray;
}

function updateSorting() {
    currentSort.column = this.dataset.sort;
    // happens before the actual sorting so it's backwards
    currentSort.order = this.classList.contains('asc') ? 'desc' : 'asc';
}

function applySorting(list, sort) {
    sort = sort || currentSort;
    currentSort = sort;

    list.sort(sort.column, { order: sort.order });
}

function updateStatus(row) {
    let tooltipTitle = [];
    let statusCell = row.querySelector('.status').parentElement;
    let statusText = statusCell.querySelector('.status');
    let statusIcon = statusCell.querySelector('[data-role="icon"]');
    let error = false;

    statusText.innerHTML = 'Pending';
    statusIcon.className = 'text-warning';

    currentScript.inputs.forEach(input => {
        if (!input.optional) {
            let inputEle = row.querySelector('.' + input.name.replace(' ', '-'));
            inputEle.removeClass('is-invalid');

            let val = inputEle.value;
            if (val != undefined && val != null && val != '') {
                return;
            }

            inputEle.addClass('is-invalid');

            statusText.innerHTML = 'Error';
            statusIcon.className = 'text-danger';
            tooltipTitle.push('<b>' + input.name + '</b> must not be empty');
        }
    });

    statusText.setAttribute('title', tooltipTitle.join('<br>'));
    $(statusText).tooltip('dispose');
    if (tooltipTitle.length > 0)
        $(statusText).tooltip();

    if (inputList) {
        let listItem = inputList.get('id', row.dataset.id)[0];
        listItem._values['status'] = statusText.innerHTML;
    }
}

function changeTitles() {
    document.querySelector('#script-title').innerHTML = currentScript.name;
    document.querySelector('#script-desc').innerHTML = currentScript.description;
}

function clearInputData() {
    inputList.clear();
}

function removeSuccessFromInputList() {
    inputList.remove('status', 'Success');
}

function refreshInputTableFilter() {
    filterInputTable(true);
}

function filterInputTable(refreshFilter) {
    refreshFilter = refreshFilter || false;

    if (!refreshFilter) {
        let filterColumnArray = this.dataset['filtercolumn'].split(',');
        let filterValueArray = this.dataset['filtervalue'].split(',');

        filterColumnArray.forEach(function (f, idx) {
            let filterColumn = f;
            let filterValue = filterValueArray[idx];

            if (filterValue != '' || filterColumn != '') {
                let filterObject = {
                    column: filterColumn,
                    value: filterValue
                };
                let foundItemIndex = currentFilter.findIndex((v, i) => v.column == filterColumn && v.value == filterValue);
                if (foundItemIndex != -1) {
                    currentFilter.splice(foundItemIndex, 1);
                }
                else {
                    currentFilter.push(filterObject);
                }
            }
            else {
                currentFilter = [];
            }
        });
    }

    if (currentFilter.length == 0) {
        inputList.filter();
        return;
    }

    inputList.filter(function (item) {
        let itemResult = false;
        return currentFilter.reduce(function (acc, curr, idx, src) {
            return acc || item._values[curr.column].localeCompare(curr.value) == 0;
        }, false);
    });
}

function clearInputTableFilter() {
    document.querySelectorAll('#filterStatusOptions label').forEach((e) => e.removeClass('active'));
    currentFilter = [];
    filterInputTable(true);
}

function searchInputList() {
    currentSearch = this.value;
    inputList.fuzzySearch(currentSearch);
}

function clearInputTableSearch() {
    let inputSearch = this.parentElement.querySelector('input').value = '';
    searchInputList.call(inputSearch);
}

function logonDataChanged() {
    console.log(this.selectedIndex);
    if (this.selectedIndex != -1) {
        console.log(this.selectedIndex);
        let selectedIndex = this.selectedIndex;
        console.log(currentProfile.defaults.logon[selectedIndex]);
        document.querySelector('#logonDataSystem').value = currentProfile.defaults.logon[selectedIndex].system;
        document.querySelector('#logonDataUsername').value = currentProfile.defaults.logon[selectedIndex].username;
    }
}

function copyDataFromClipboard() {
    // TODO : Needs to be tested on a server

    // navigator.permissions.request({name: 'clipboard-read'}).then( function (response) {
    //     console.log(response);
    //     console.log(navigator.permissions.get('clipboard-read'));
    // });

    // navigator.clipboard.readText().then(
    //     clipText => console.log(clipText));
}

function openNewConnectionModal() {
    $('#newConnectionModal').modal('show');

    document.querySelector('#newConnectionSystem').value = document.querySelector('#logonDataSystem').value;
    document.querySelector('#newConnectionUsername').value = document.querySelector('#logonDataUsername').value;
}

function addNewConnection() {
    let system = document.querySelector('#newConnectionSystem').value;
    let username = document.querySelector('#newConnectionUsername').value;
    let defaultConection = document.querySelector('#defaultConnection').checked;

    // TODO : add the new connection
}

/* #endregion */
/* Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data */

/* Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute */
/* #region Execute */

function executeScript(forceRun) {
    forceRun = forceRun || false;

    let error = false;
    inputList.items.forEach(item => {
        error = error || item._values['status'] == "Error";
    });

    if (!forceRun && error) {
        // do alert
        $('#inputDataErrorModal').modal('show');
        return;
    }

    alert('run script here');

    // $('#ScriptExecutionAlert').alert();

    clearInputTableFilter();

    let statusCells = document.querySelector('#' + inputDataTableContainer).querySelectorAll('.status');
    statusCells.forEach(function (e) {
        e.previousElementSibling.addClass('is-loading').addClass('pr-4');
        e.innerText = 'Executing';
    });

    // statusCells.forEach( (e) => e.previousElementSibling.addClass('is-loading').addClass('pr-4') );
    // statusCells.forEach( (e) => e.innerText = 'Executing' );

    document.querySelectorAll('[data-role="erorr_description"').forEach((e) => e.parentElement.removeChild(e));

    inputList.items.forEach((item) => item._values['status'] = 'Executing');

    document.querySelector('#filterOptionsToggle').children[0].setAttribute('disabled', '');
    $('#filterStatusOptions').collapse('hide');

    // let statusCells = [].slice.call(document.querySelector('#' + inputDataTableContainer).querySelectorAll('.status')).map((e) => e.previousElementSibling);
    // statusCells.forEach((e) => e.addClass('is-loading'));

    isExecuting = true;
    waitForExecutionResult();
}

function saveForLater() {

}

function waitForExecutionResult() {
    if (!isExecuting)
        return;

    let previousScriptElement = document.querySelector('#executionResult');
    if (previousScriptElement)
        document.body.removeChild(previousScriptElement);

    let resultScript = document.createElement('script');
    resultScript.setAttribute('id', 'executionResult');
    resultScript.setAttribute('src', 'results/session_id-result.js');
    resultScript.setAttribute('onload', 'executionResultLoaded();');

    document.body.append(resultScript);

    setTimeout(waitForExecutionResult, 3000);
}

function executionResultLoaded() {
    // testing - will be loaded via script
    executionResult = {
        timestamp: '123',
        results: [
            {
                id: 1,
                success: true,
                desc: ''
            },
            {
                id: 2,
                success: false,
                desc: 'error description'
            }
        ]
    };

    isExecuting = false;

    document.querySelectorAll('#' + inputDataTableContainer + ' .is-loading').forEach((e) => e.removeClass('is-loading').removeClass('pr-4'));
    document.querySelector('#filterOptionsToggle').children[0].removeAttribute('disabled', '');

    executionResult.results.forEach(item => {
        let inputListItem = inputList.get('id', item.id)[0];
        inputListItem._values['status'] = item.success ? 'Success' : 'Execution Error';

        let itemRow = document.querySelector('#' + inputDataTableContainer + ' [data-id="' + item.id + '"]');

        let statusText = itemRow.querySelector('.status');
        statusText.innerText = item.success ? 'Success' : ' Execution Error';

        let statusIcon = statusText.previousElementSibling;
        statusIcon.className = item.success ? 'text-success' : 'text-danger';


        if (item.desc != undefined && item.desc != null && item.desc != '') {
            let statusCell = statusText.parentElement;
            // let previousError = statusCell.querySelector('[data-role="erorr_description"');
            // if (previousError != null)
            //     previousError.parentElement.removeChild(previousError);

            let statusErrorDescription = document.createElement('div');
            statusErrorDescription.setAttribute('data-role', 'erorr_description');
            statusErrorDescription.innerHTML = " - " + item.desc;

            statusCell.append(statusErrorDescription);
        }
    });
}

/* #endregion */
/* Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute */

/* History -- History -- History -- History -- History -- History -- History -- History -- History -- History -- History -- History -- History -- History */
/* #region History */

var historyList;
var historyOptions;

var historyEntryResultList;

function expandHistory() {
    // TODO
    // console.log('expand history ' + this.dataset.id);
    selectedScriptIndex = this.dataset['scriptid'];
    // console.log(selectedScriptIndex);
    currentScript = scriptsArray[selectedScriptIndex];

    document.querySelector('#historyEntryTableContainer').querySelector('tbody').innerHTML = '';

    historyEntryResultList = null;
    historyEntryResultList = createInputDataTable(historyEntryResultList, document.querySelector('#historyEntryTableContainer'), true, true, [{name: 'description', width: 2}]);

    clearHistoryEntrySearch.call(document.querySelector('#historyEntrySearchInput'));

    loadHistoryEntryResults(this.dataset.id);
    toggleHistoryTables();
}

function historyBack() {
    let historyEntryTable = document.querySelector('#historyEntryTableContainer').querySelector('table');
    let historyEntryTableHeaderRow = historyEntryTable.querySelector('table thead tr');
    while (historyEntryTableHeaderRow.children.length > 1) {
        historyEntryTableHeaderRow.removeChild(historyEntryTableHeaderRow.firstElementChild);
    }

    toggleHistoryTables();
}

function toggleHistoryTables() {
    loadHistoryEntryResults();

    $('#historyEntryTableContainer').collapse('toggle');
    $('#historyTableContainer').collapse('toggle');
}

function loadHistoryEntryResults(entryId) {
    if (entryId == undefined || entryId == null)
        return;
    
    let entry = executionHistory.find( (e) => e.id == entryId);
    entry.inputs.forEach( function (i) {
        let historyResultEntry = Object.keys(i).reduce( function (acc, key) {
            acc[key] = i[key];
            return acc;
        }, {});
        historyResultEntry.status = entry.results.find((r) => r.id == i.id).success ? 'Success' : 'Error';
        historyResultEntry.description = entry.results.find((r) => r.id == i.id).desc;

        historyEntryResultList.add(historyResultEntry);
    });

    historyEntryResultList.listContainer.querySelectorAll('.status').forEach( function (e) {
        e.previousElementSibling.className = e.innerHTML == 'Error' ? 'text-danger' : 'text-success';
    });
}

function loadHistory() {
    let historyTableContainer = document.querySelector('#historyTableContainer');
    historyOptions = {
        valueNames: [
            // { data: ['id'] },
            { data: ['id', 'scriptid'] },
            // { data: ['script-id'] },
            'script',
            'timestamp',
            'ran_by',
            'result'
        ]
    };

    historyList = new List('historyTableContainer', historyOptions);
    historyList.clear();
    executionHistory.forEach(function (i) {
        let resultSuccess = i.results.filter( (item) => item.success).length;
        let resultPercentage = resultSuccess / i.results.length * 100;
        let historyEntry = {
            'id': i.id,
            'scriptid': i.script,
            'script': scriptsArray[i.script].name,
            'timestamp': `${i.timestamp.day}/${i.timestamp.month}/${i.timestamp.year} ${i.timestamp.hour}:${i.timestamp.minute}`,
            'ran_by': userProfiles[i.ran_by].fullName(),
            'result': `${resultSuccess}/${i.results.length} (${resultPercentage}%)`
        };

        historyList.add(historyEntry);
    });
}

function searchHistoryList() {
    searchList(historyList, this.value);
}

function clearHistorySearch() {
    let historySearch = this.parentElement.querySelector('input').value = '';
    searchHistoryList.call(historySearch);
}

function filterHistoryTable(refreshFilter) {
    refreshFilter = refreshFilter || false;

    if (!refreshFilter) {
        let filterColumnArray = this.dataset['filtercolumn'].split(',');
        // let filterValueArray = this.dataset['filtervalue'].split(',');
        let filterValueArray = $(this).val();

        if (filterValueArray.length != 0) {
            filterColumnArray.forEach(function (f, idx) {
                let filterColumn = f;
                let filterValue = filterValueArray[idx];

                if (filterValue != '' || filterColumn != '') {
                    console.log(filterValue);
                    let filterObject = {
                        column: filterColumn,
                        value: filterValue
                    };
                    let foundItemIndex = currentFilter.findIndex((v, i) => v.column == filterColumn && v.value == filterValue);
                    if (foundItemIndex != -1) {
                        currentFilter.splice(foundItemIndex, 1);
                    }
                    else {
                        currentFilter.push(filterObject);
                    }
                }
                else {
                    currentFilter = [];
                }
            });
        }
        else {
            currentFilter = [];
        }
    }

    console.log(currentFilter);

    if (currentFilter.length == 0) {
        historyList.filter();
        return;
    }

    historyList.filter(function (item) {
        let itemResult = false;
        return currentFilter.reduce(function (acc, curr, idx, src) {
            return acc || item._values[curr.column] == curr.value;
        }, false);
    });
}

function updateHistoryScriptDropdown() {
    let scriptSelect = document.querySelector('#filterScriptsOptionsSelect');
    scriptsArray.forEach( function (s) {
        let option = document.createElement('option');
        option.setAttribute('value', s.id);
        option.innerHTML = s.name;
        scriptSelect.append(option);
    });
}

function searchHistoryEntryList() {
    searchList(historyEntryResultList, this.value);
}

function clearHistoryEntrySearch() {
    let historySearch = this.parentElement.querySelector('input').value = '';
    searchHistoryEntryList.call(historySearch);
}

/* #endregion */
/* History -- History -- History -- History -- History -- History -- History -- History -- History -- History -- History -- History -- History -- History */

/* Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile */
/* #region Profile */

function updateProfileName() {
    let profileNickname = document.querySelector('#profileNickname');
    if (profileNickname)
        profileNickname.innerHTML = currentProfile.nickname;

    let profileName = document.querySelector('#profileName');    
    if (profileName)
        profileName.innerHTML = currentProfile.fullName();
}

function setProfileHeaderNavigation(activeIndex) {
    let profileNavigationContainer = document.querySelector('#profileHeaderNavigation');
    profileNavigationContainer.innerHTML += '<ul class="nav nav-tabs nav-overflow header-tabs">' +
        '<li class="nav-item"> <a href="profile.html" class="nav-link"> Profile </a> </li>' +
        '<li class="nav-item"> <a href="under-construction.html" class="nav-link"> Defaults </a> </li>' +
        '<li class="nav-item"> <a href="history.html" class="nav-link"> Execution History </a> </li>' +
        '</ul>';
    
        profileNavigationContainer.querySelector('ul').children[activeIndex].children[0].addClass('active');
}

/* #endregion */
/* Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile -- Profile */

/* Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init */

function updateSelectedScript() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let scriptId = url.searchParams.get('script-id');

    currentScript = scriptsArray[scriptId];
}

function updateCurrentProfile() {
    currentProfile = userProfiles[0];
    updateProfileName();
}

function updateTooltips() {
    $('[data-toggle="tooltip"]').tooltip();
}

function updatePredefinedConnections() {
    let selectElement = document.querySelector('#predefinedConnectionsSelect');

    currentProfile.defaults.logon.forEach(function (e, idx) {
        let option = document.createElement('option');
        option.innerHTML = e.description;
        option.setAttribute('value', idx);
        if (e.default)
            option.setAttribute('selected', 'selected');
        selectElement.append(option);
    });

    if (selectElement.selectedIndex != '' && selectElement.selectedIndex != -1) {
        let selectedIndex = selectElement.selectedIndex;
        document.querySelector('#logonDataSystem').value = currentProfile.defaults.logon[selectedIndex].system;
        document.querySelector('#logonDataUsername').value = currentProfile.defaults.logon[selectedIndex].username;
    }
}

// Init when the script is loaded
function dataHandlerInit() {
    updateSelectedScript();
    changeTitles();
    loadMenusFromFile();
    createInputDataTable();
    updateTooltips();
    updatePredefinedConnections();
}

/* Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init */

//dataHandlerInit();