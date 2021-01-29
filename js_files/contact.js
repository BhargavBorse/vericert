var uid;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        uid = user.uid;
        if(displayName!=null)
        {
            // document.getElementById('userName').innerText=displayName;
        }
        // ...
    } else {
        // User is signed out.
        // ...
        window.location.replace('index.html');
    }
});

var database = firebase.database().ref();
var eventRef = firebase.database().ref('users');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        n =  new Date();
        y = n.getFullYear();
        m = n.getMonth() + 1;
        d = n.getDate();
        
        var displayEmail = user.email;
        var displayn = user.displayName;
        
        database.child(user.uid).child('user_details').on('value',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            
            document.getElementById('name').value = displayn;
            document.getElementById('email').value = displayEmail;
        });
        // var date = document.getElementById("date").value = d + "/" + m + "/" + y;
        
        var time = new Date();
        
        var current_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        
        document.getElementById('subBtn').onclick = function(){
            
            // var x = document.forms["myForm"]["message"].value;
            // if (x == "") {
            //     alert("Please enter message");
            //     return false;
            // }
            
            // alert(time);
            
            
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var subject = document.getElementById('subject').value;
            var message = document.getElementById('message').value;
            // alert(message_for);
            
            if (name == "") {
                alert("Name must be filled out");
                return false;
            }
            else if(email == "")
            {
                alert("Email must be filled out");
                return false;
            }
            else if(message == "")
            {
                alert("Message must be filled out");
                return false;
            }
            
            database.child('contact').push({
                id: user.uid,
                name: name, 
                email: email,
                subject : subject,
                message: message,
                feed_date: d + "/" + m + "/" + y,
                feed_time: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            });
            alert('Your query is sent to our representative.');
            location.reload();
            // end of storing data
        };
    }
});