var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("noteKey");

// alert(id);
var deleteProc = firebase.database().ref().child('officials_notes').child(id);

function del()
{
    deleteProc.remove(function(){
        alert('Note deleted');
        window.location.replace('main.html');
    });
}
function back()
{
    window.location.replace('main.html');
}