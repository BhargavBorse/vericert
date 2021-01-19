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
    
  } else {
    // No user is signed in.
    window.location.replace('index.html');
  }
});

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
