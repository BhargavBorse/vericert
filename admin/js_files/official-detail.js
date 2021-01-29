firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        
        // document.getElementById("user_div").style.display = "block";
        // document.getElementById("login_div").style.display = "none";
        
        // var user = firebase.auth().currentUser;
        
        // if(user != null){
        
        //   var email_id = user.email;
        //   document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
        
        // }
        
        var email_id = user.email;
        //   alert(email_id);
        document.getElementById("user_para").innerHTML = email_id;    
        
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        // alert(id);
        firebase.database().ref().child('officials').child(id).on('value',function(feed_snapshot){
            var snap = feed_snapshot.val();
            document.getElementById('name').value = snap.name;
            document.getElementById('email').value = snap.email;
            document.getElementById('phone_no').value = snap.phone_no;
            document.getElementById('address').value = snap.address;
            document.getElementById('gender').value = snap.gender;
            document.getElementById('status').value = snap.login_status;
            document.getElementById('dob').value = snap.dob;
            document.getElementById('ins_name').value = snap.ins_name;
            document.getElementById('ins_add').value = snap.ins_add;
            document.getElementById('designation').value = snap.designation;
            document.getElementById('e_id').value = snap.e_id;
            document.getElementById('role').value = snap.role;
        });
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
function inactive()
{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref().child('officials').child(id).update({
                login_status: 'inactive'
            });
            alert('Account inactivated');
        }
    });
}

function logout(){
    firebase.auth().signOut();
}