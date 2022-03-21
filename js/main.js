window.onload = function () {
    const ed = document.querySelector('#editor')
    var editor = CodeMirror.fromTextArea(ed, {
        lineNumbers: true,
        mode: 'htmlmixed'
    });
}