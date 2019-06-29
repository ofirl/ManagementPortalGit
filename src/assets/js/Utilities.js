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

export function formatStringDateTime(date) {
    // let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // let pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    // // console.log(date);
    // let dt = new Date(date.replace(pattern, '$3-$2-$1'));
    // // console.log(dt);

    return new Date(date).toLocaleString('default');
    // return dt.toLocaleString('default', options);
}

export function formatStringDate(date) {
    // let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // let pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    // // console.log(date);
    // let dt = new Date(date.replace(pattern, '$3-$2-$1'));
    // // console.log(dt);

    return new Date(date).toLocaleDateString('default');
    // return dt.toLocaleString('default', options);
}

export function switchDateStringMonthAndDay(date) {
    let pattern = /(\d+)\/(\d+)\/(\d+)/;
    return date.replace(pattern, '$2/$1/$3');
}

export function copyText(text) {
    // Create textarea element
    const textarea = document.createElement('textarea')

    // Set the value of the text
    textarea.value = text;

    // Make sure we cant change the text of the textarea
    textarea.setAttribute('readonly', '');

    // Hide the textarea off the screnn
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Add the textarea to the page
    document.body.appendChild(textarea);

    textarea.focus();

    // Copy the textarea
    textarea.select()

    try {
        var successful = document.execCommand('copy');
        this.copied = true
    } catch (err) {
        this.copied = false
    }

    textarea.remove();

    return successful && this.copied;
}