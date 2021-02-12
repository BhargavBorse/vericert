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
    
    // create note in db
    document.getElementById('create_note').onclick = (function(){
      
      var subject = document.getElementById('subject').value;
      var message = document.getElementById('message').value;
      
      firebase.database().ref().child('recruiter_notes').push({
        subject: subject,
        message: message
      });
      document.getElementById('subject').value = "";
      document.getElementById('message').value = "";
    });
    
    // fetch notes from db
    firebase.database().ref().child('recruiter_notes').on('child_added',function(note_snapshot){
      var note_snap = note_snapshot.val();
      var noteKey = note_snapshot.key;
      
      var div_blog = document.createElement('div');
      div_blog.className="blog-comments__item d-flex p-3";
      
      document.getElementsByClassName('bhargav')[0].appendChild(div_blog);
      
      var blog_content = document.createElement('div');
      blog_content.className = "blog-comments__content"
      
      var h6 = document.createElement('h6');
      var h6_content = document.createTextNode("Subject: " + note_snap.subject);
      h6.appendChild(h6_content);
      
      var pTag = document.createElement('p');
      pTag.className = "m-0 my-1 mb-2 text-muted";
      blog_content.appendChild(h6);
      
      var pTagContent = document.createTextNode("Message: " + note_snap.message);
      pTag.appendChild(pTagContent);
      blog_content.appendChild(pTag);
      
      var commentAction = document.createElement('div');
      commentAction.className = "blog-comments__actions";
      
      var btnGroup = document.createElement('div');
      btnGroup.className = "btn-group btn-group-sm";
      
      var spanTag = document.createElement('span');
      spanTag.className = "text-danger";
      
      var iTag = document.createElement('i');
      iTag.className = "material-icons";
      var iTagContent = document.createTextNode('clear');
      iTag.appendChild(iTagContent);      
      
      var aTag = document.createElement('a');
      aTag.setAttribute('href', 'blank_delete.html?noteKey=' + noteKey);
      aTag.setAttribute('id', 'delete_note');
      aTag.className = 'btn btn-white';
      var aTagContent = document.createTextNode('Delete Note ');
      
      aTag.appendChild(aTagContent);
      btnGroup.appendChild(aTag);
      
      spanTag.appendChild(iTag);
      aTag.appendChild(spanTag);
      
      commentAction.appendChild(btnGroup);
      blog_content.appendChild(commentAction);
      div_blog.appendChild(blog_content);
    });
    
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
