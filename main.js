$(document).ready(function () {
    var sel = '';
    var i = 1;
    function gText(e) {
        sel = (document.all) ? document.selection.createRange().text : document.getSelection();
        if (sel.type == "Range") {
            var ele = document.createElement("a");
            ele.setAttribute('href', '#');
            ele.setAttribute('id', 'tag' + i);
            ele.setAttribute('style', 'background-color : yellow;');
            ele.setAttribute('data-toggle', 'popover');
            ele.setAttribute('data-container', 'body');
            ele.setAttribute('type', 'button');
            ele.setAttribute('data-html', 'true');
            ele.innerHTML = sel;
            if (sel.rangeCount > 0) {
                var range = sel.getRangeAt(0);
                range.collapse(false);
                range.insertNode(ele);
                $("#tag" + i).popover({
                    html: true,
                    content: function () {
                        $('input#popoverInput')[0].placeholder = this.id;
                        return $('#popover-content').html();
                    }
                });
                i++;
            }
        }
    }

    document.onmouseup = gText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);

    $(document).mouseup(function (e) {
        if ($('.popover').has(e.target).length === 0) {
            $('.popover').toggleClass('in').remove();
            return;
        }
    });
});

var saveTag = function (event) {
    var prev = event.parentElement.children[0].placeholder;
    var v = event.parentElement.children[0].value;
    if (v == '') {
        v = prev;
    }
    $('#' + prev)[0].id = v;
    $('#' + v).popover('toggle');
}

var closeTag = function (event) {
    var id = event.parentElement.children[0].placeholder;
    $('#' + id).popover('toggle');
}

var removeTag = function (event) {
    var id = event.parentElement.children[0].placeholder;
    $('#' + id).contents().unwrap();
}