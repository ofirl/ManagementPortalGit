export function setToValue(obj, value, path) {
    var a = path.split('.');
    var context = obj;
    var myregexp = /([a-zA-Z]+)(\[(\d)\])+/; // matches:  item[0]
    var match = null;

    for (var i = 0; i < a.length - 1; i += 1) {
        match = myregexp.exec(a[i]);
        if (match !== null)
            context = context[match[1]][match[3]];
        else
            context = context[a[i]];
    }

    // check for ending item[xx] syntax
    match = myregexp.exec([a[a.length - 1]]);

    if (match !== null)
        context[match[1]][match[3]] = value;
    else
        context[a[a.length - 1]] = value;
}