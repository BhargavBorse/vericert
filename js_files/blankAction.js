var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        n =  new Date();
        y = n.getFullYear();
        m = n.getMonth() + 1;
        d = n.getDate();
        
        var expiryDate = d + 3;

        document.getElementById('accept').onclick = function(){
            
            firebase.database().ref().child('users').child(user.uid).child('requests').child(id).update({
                requestStatus: 'accepted',
                expiryDate: expiryDate + "/" + m + "/" + y
            });
            alert('Request Accepted');
            // window.location.replace('request.html');
        }
        document.getElementById('reject').onclick = function(){
            
            firebase.database().ref().child('users').child(user.uid).child('requests').child(id).update({
                requestStatus: 'rejected'
            });
            alert('Request Rejected');
            // window.location.replace('request.html');
        }
    }
});
