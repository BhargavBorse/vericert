// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
        
//         // document.getElementById("user_div").style.display = "block";
//         // document.getElementById("login_div").style.display = "none";
        
//         // var user = firebase.auth().currentUser;
        
//         // if(user != null){
        
//         //   var email_id = user.email;
//         //   document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
        
//         // }
        
//         var email_id = user.email;
//         //   alert(email_id);
//         document.getElementById("user_para").innerHTML = email_id;
        
//     } else {
//         // No user is signed in.
//         window.location.replace('index.html');
//     }
// });

function add_off(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone_no = document.getElementById('phone_no').value;
    var address = document.getElementById('address').value;
    var gender = document.getElementById('gender').value;
    var dob = document.getElementById('dob').value;
    var ins_name = document.getElementById('institute').value;
    var ins_add = document.getElementById('ins_add').value;
    var designation = document.getElementById('designation').value;
    var e_id = document.getElementById('e_id').value;
    var officials = document.getElementById('officials').value;
    // var email_two = document.getElementById('email_two').value;
    var password = document.getElementById('password').value;
    
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
    else if(ins_name == "")
    {
        alert("Institute Name must be filled out");
        return false;
    }
    else if(ins_add == "")
    {
        alert("Institute address must be filled out");
        return false;
    }
    else if(designation == "")
    {
        alert("Designation must be filled out");
        return false;
    }
    else if(e_id == "")
    {
        alert("Employee Id must be filled out");
        return false;
    }
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        // Signed in 
        // ...
        firebase.database().ref().child('officials').push({
            name: name,
            email: email, 
            phone_no: phone_no,
            address: address,
            gender: gender,
            dob: dob,
            ins_name: ins_name,
            ins_add: ins_add,
            designation: designation,
            e_id: e_id,
            role: officials,
            login_status: 'inactive'
        });
        console.log(user);
        alert('Account has been created, please click login button');
        var login_vis = document.getElementById('login_sign');
        login_vis.style.visibility = 'visible';
        // window.location.href = 'index.html';
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        window.alert("Error : " + errorMessage);
    });
}

document.getElementById('login_sign').onclick = function(){
    window.location.replace('main.html');
}

function getmail()
{
    var email = document.getElementById('email').value;
    document.getElementById('email_two').value = email;
}

function forgot_password(){
    
    var auth = firebase.auth();
    var userEmail = document.getElementById("email_field").value;
    
    auth.sendPasswordResetEmail(userEmail).then(function() {
        // Email sent.
        window.alert("To reset password please check your email");
    }).catch(function(error) {
        // An error happened.
        window.alert("Please enter correct Email Id");
    });
    
}

function logout(){
    firebase.auth().signOut();
}