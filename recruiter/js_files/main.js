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



var eventRef = firebase.database().ref('recruiter');
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // console.log(user.uid);
    // console.log(user.email);
    // flagNotOfficial = 0;
    // flagActive = 0;
    flagOfficial = 0;
    flagActive = 0;
    firebase.database().ref().child('recruiter').on('child_added',function(return_value){
      return_value_value = return_value.val();
      var status = return_value_value.login_status;
      var email = return_value_value.email;
      
      // alert(user.email);
      // alert(return_value_value.email);
      if(user.email == return_value_value.email)
      {
        flagOfficial = flagOfficial + 1;
        // alert('imposter');
        if(status == 'inactive')
        {
          // alert('inner if');
          window.location = 'waiting.html';
        }
        else
        {
          flagActive = flagActive + 1;
          console.log(flagActive);
        }
        return;
        // else
        // {
        //   alert('error in 2 if')
        // }
      }
      // else{
      //   flagNotOfficial = 1;
      //   console.log(flagNotOfficial);
      // }
      // else
      // {
      //   alert('1 if');
      //   // window.location = 'waiting.html';
      // }
    });
    //Run kar ek baar
    //await diya phir b ruk nhi rhaa -_-
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
