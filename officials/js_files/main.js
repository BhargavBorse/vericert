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
    flagOfficialauth = 0;
    flagActiveauth = 0;
    
    firebase.database().ref().child('officials').on('child_added', function(off_snapshot){
      var off_snap_key = off_snapshot.key;
      firebase.database().ref().child('officials').child(off_snap_key).on('value', function(off_det){
        var off_snap = off_det.val();
        
        var off_email = off_snap.email;
        if(off_email === user.email)
        {
          firebase.database().ref().child('officials').child(off_snap_key).update({
            offId: user.uid
          });
        }
      });
    });
    
    firebase.database().ref().child('merged').on('child_added', function(off_snapshot){
      var off_snap_key = off_snapshot.key;
      firebase.database().ref().child('merged').child(off_snap_key).on('value', function(off_det){
        var off_snap = off_det.val();
        
        var offid = off_snap.offId;
        var offrole = off_snap.role;
        var offemail = off_snap.email;
        
        if(offemail == user.email)
        {
          flagOfficialauth = flagOfficialauth + 1;
          if(offrole == 'Officials')
          {
            // alert('Authorized');
            // window.location = 'waiting.html';
          }
          else
          {
            flagActiveauth = flagActiveauth + 1;
            console.log(flagActiveauth);
            alert('Unauthorized login');
            firebase.auth().signOut();
          }
          return;
        }
      });
    });
    var email_id = user.email;
    //   alert(email_id);
    document.getElementById("user_para").innerHTML = email_id;
    
    // create note in db
    document.getElementById('create_note').onclick = (function(){
      
      var subject = document.getElementById('subject').value;
      var message = document.getElementById('message').value;
      
      if(subject == '')
      {
        alert('Please enter subject');
        return false;
      }
      else if(message == '')
      {
        alert('Please enter message');
        return false;
      }
      firebase.database().ref().child('officials_notes').push({
        subject: subject,
        message: message,
        userId: user.uid
      });
      document.getElementById('subject').value = "";
      document.getElementById('message').value = "";
    });
    
    // fetch notes from db
    firebase.database().ref().child('officials_notes').on('child_added',function(note_snapshot){
      var note_snap = note_snapshot.val();
      var iid = note_snap.userId;
      var noteKey = note_snapshot.key;
      if(iid === user.uid)
      {
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
      }
    });
    
  } else {
    // No user is signed in.
    window.location.replace('index.html');
  }
});



var eventRef = firebase.database().ref('officials');
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    flagOfficial = 0;
    flagActive = 0;
    firebase.database().ref().child('officials').on('child_added',function(return_value){
      return_value_value = return_value.val();
      var status = return_value_value.login_status;
      var email = return_value_value.email;
      
      // alert(email);
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
