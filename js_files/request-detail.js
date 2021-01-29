var database = firebase.database().ref('users');

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // uid = user.uid;
        // if(displayName!=null)
        // {
        //     document.getElementById('userName').innerText=displayName;
        // }
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        
        database.child(user.uid).child('requests').child(id).on('value',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            
            document.getElementById('name').value = user_details.recName;
            document.getElementById('recDesignation').value = user_details.recDesignation;
            document.getElementById('requestBy').value = user_details.requestBy;
            document.getElementById('insName').value = user_details.insName;
            document.getElementById('insAddress').value = user_details.insAddress;
            document.getElementById('requestDate').value = user_details.requestDate;
            document.getElementById('requestStatus').value = user_details.requestStatus;
            document.getElementById('expiryDate').value = user_details.expiryDate;

            if(user_details.requestStatus ==='expired')
            {
                var disable = document.getElementById('accept');
                disable.style.visibility = 'hidden';

                var dis = document.getElementById('reject');
                dis.style.visibility = 'hidden';
            }
        });
        
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
        }
        document.getElementById('reject').onclick = function(){
            
            firebase.database().ref().child('users').child(user.uid).child('requests').child(id).update({
                requestStatus: 'rejected'
            });
            alert('Request Rejected');
        }
    } else {
        // User is signed out.
        // ...
        window.location.replace('index.html');
    }
});
function profile() {
    window.location.replace('profile.html');
}

function request() {
    window.location.replace('request.html');
}

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.replace('index.html');
    }).catch(function (error) {
        // An error happened.
    });
}