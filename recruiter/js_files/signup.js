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
    var ins_name = document.getElementById('ins_name').value;
    var ins_add = document.getElementById('ins_add').value;
    var designation = document.getElementById('designation').value;
    var e_id = document.getElementById('e_id').value;
    var officials = document.getElementById('officials').value;
    // var email_two = document.getElementById('email_two').value;
    var password = document.getElementById('password').value;
    
    // var database = firebase.database().ref();
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        // Signed in 
        // ...
        firebase.database().ref().child('recruiter').push({
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
        alert('Account created');
        // window.location.replace('index.html');
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        window.alert("Error : " + errorMessage);
    });
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