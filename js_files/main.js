var eventRef = firebase.database().ref('users');

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        uid = user.uid;
        if(displayName!=null)
        {
            document.getElementById('userName').innerText=displayName;
        }
        // ...
    } else {
        // User is signed out.
        // ...
        window.location.replace('index.html');
    }
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // console.log(user.uid);
        // console.log(user.email);
        eventRef.child(user.uid).child('user_details').on('value',function(return_value){
            return_value_value = return_value.val();

            if(return_value_value === null){
                // alert(return_value_value);
                window.location = 'firstLogin.html';
            }
            else
            {
                // eventRef.child(user.uid).child('details').update({
                //     email : user.email
                // });
            }
        });
    }
});

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.replace('index.html');
    }).catch(function (error) {
        // An error happened.
    });
}

function profile() {
    window.location.replace('profile.html');
}

function request() {
    window.location.replace('request.html');
}