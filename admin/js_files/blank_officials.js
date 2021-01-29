var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

var deleteProc = firebase.database().ref().child('officials').child(id);

function del()
{
    deleteProc.remove(function(){
        alert('Request deleted');
        window.location.replace('official-request.html');
    });
}
function back()
{
    window.location.replace('official-request.html');
}