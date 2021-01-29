var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("userId");
var certKey = url.searchParams.get("certKey");

var deleteProc = firebase.database().ref().child('users').child(id).child('certificates').child(certKey);

function del()
{
    deleteProc.remove(function(){
        alert('Certificate deleted');
        window.location.replace('issued-history.html');
    });
}
function back()
{
    window.location.replace('issued-history.html');
}