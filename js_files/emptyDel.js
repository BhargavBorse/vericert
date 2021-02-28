var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
var userId = url.searchParams.get("userId");

// alert(id);
var deleteProc = firebase.database().ref().child('users').child(userId).child('achievements').child(id);

function del()
{
    deleteProc.remove(function(){
        alert('Achievement certificate deleted');
        window.location.replace('main.html');
    });
}
function back()
{
    window.location.replace('main.html#blog');
}