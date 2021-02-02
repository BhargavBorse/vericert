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
        
        firebase.database().ref().child('admin').child('-MRAK70sbVRekez7-H_S').on('value',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            
            // alert(user_details.name);
            document.getElementById('name').value = user_details.name;
            document.getElementById('email').value = user_details.email;
            document.getElementById('phone_no').value = user_details.phone_no;
            document.getElementById('address').value = user_details.address;
            document.getElementById('gender').value = user_details.gender;
            document.getElementById('dob').value = user_details.dob;
        });
        
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});

function add_off(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone_no = document.getElementById('phone_no').value;
    var address = document.getElementById('address').value;
    var gender = document.getElementById('gender').value;
    var dob = document.getElementById('dob').value;
    
    if (name == "") {
        alert("Name must be filled out");
        return false;
    }
    else if(email == "")
    {
        alert("Email must be filled out");
        return false;
    }
    else if(phone_no == "")
    {
        alert("Phone number must be filled out");
        return false;
    }
    else if(phone_no.length != 10)
    {
        alert("Phone number is in wrong format ");
        phone_no.focus();
        return false;
    }
    else if(address == "")
    {
        alert("Address must be filled out");
        return false;
    }
    else if(dob == "")
    {
        alert("Date of birth must be filled out");
        return false;
    }
    
    else if(gender == "")
    {
        alert("Gender must be filled out");
        return false;
    }
    // var database = firebase.database().ref();
    firebase.database().ref().child('admin').child('-MRAK70sbVRekez7-H_S').update({
        name: name,
        email: email, 
        phone_no: phone_no,
        address: address,
        gender: gender,
        dob: dob
    });
    alert('Account updated');
}

function forgot_password(){
    
    var auth = firebase.auth();
    var userEmail = document.getElementById("email").value;
    alert(userEmail);
    auth.sendPasswordResetEmail(userEmail).then(function() {
        // Email sent.
        window.alert("To reset password please check your email");
    }).catch(function(error) {
        // An error happened.
        var errorMessage = error.message;
        // ..
        window.alert("Error : " + errorMessage);
    });
    
}

function logout(){
    firebase.auth().signOut();
}