var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

var deleteProc = firebase.database().ref().child('recruiter').child(id);

function del()
{
    deleteProc.remove(function(){
        alert('Request deleted');
        window.location.replace('recruiter-request.html');
    });
}
function back()
{
    window.location.replace('recruiter-request.html');
}