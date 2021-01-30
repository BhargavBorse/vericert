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
        
        firebase.database().ref().child('officials').on('child_added',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            var key = user_details_snapshot.key;
            
            if(user.email == user_details.email){
                // alert('inactive');
                document.getElementById('name').value = user_details.name;
                document.getElementById('email').value = user_details.email;
                document.getElementById('phone_no').value = user_details.phone_no;
                document.getElementById('address').value = user_details.address;
                document.getElementById('gender').value = user_details.gender;
                document.getElementById('dob').value = user_details.dob;
                document.getElementById('ins_name').value = user_details.ins_name;
                document.getElementById('ins_add').value = user_details.ins_add;
                document.getElementById('designation').value = user_details.designation;
                document.getElementById('e_id').value = user_details.e_id;
                document.getElementById('role').value = user_details.role;
                
                
                
                document.getElementById('add_off').onclick = function()
                {
                    var name = document.getElementById('name').value;
                    var email = document.getElementById('email').value;
                    var phone_no =  document.getElementById('phone_no').value;
                    var address = document.getElementById('address').value;
                    var gender = document.getElementById('gender').value;
                    var dob = document.getElementById('dob').value;
                    var ins_name = document.getElementById('ins_name').value;
                    var ins_add = document.getElementById('ins_add').value;
                    var designation = document.getElementById('designation').value;
                    var e_id = document.getElementById('e_id').value;
                    var role = document.getElementById('role').value;
                    
                    firebase.database().ref().child('officials').child(key).update({
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
                        role: role
                    });
                    alert('Updated');
                }
            }
        });
        
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});

// function add_off(){

//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {

//             firebase.database().ref().child('officials').on('child_added',function(user_details_snapshot){
//                 var user_details = user_details_snapshot.val();
//                 var key = user_details_snapshot.key;

//                 if(user.email == user_details.email){
//                     // alert('inactive');
//                     var name = document.getElementById('name').value;
//                     var email = document.getElementById('email').value;
//                     var phone_no =  document.getElementById('phone_no').value;
//                     var address = document.getElementById('address').value;
//                     var gender = document.getElementById('gender').value = user_details.gender;
//                     var dob = document.getElementById('dob').value;
//                     var ins_name = document.getElementById('ins_name').value;
//                     var ins_add = document.getElementById('ins_add').value;
//                     var designation = document.getElementById('designation').value;
//                     var e_id = document.getElementById('e_id').value;
//                     var role = document.getElementById('role').value;

//                     firebase.database().ref().child('officials').child(key).update({
//                         name: name,
//                         email: email,
//                         phone_no: phone_no,
//                         address: address,
//                         gender: gender,
//                         dob: dob,
//                         ins_name: ins_name,
//                         ins_add: ins_add,
//                         designation: designation,
//                         e_id: e_id,
//                         role: role
//                     });
//                     alert('Updated');
//                 }
//             });
//         }
//     });    
// }

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