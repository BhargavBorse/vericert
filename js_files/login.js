firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
      // User is signed in.
      window.location.replace('main.html');
      // ...
  } else {
      // User is signed out.
      // ...
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      var uiConfig = {
          callbacks: {
              signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                  // User successfully signed in.
                  // Return type determines whether we continue the redirect automatically
                  // or whether we leave that to developer to handle.
                  return true;
              },
              uiShown: function () {
                  // The widget is rendered.
                  // Hide the loader.
                  document.getElementById('loader').style.display = 'none';
              }
          },
          // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
          signInFlow: 'popup',
          signInSuccessUrl: 'main.html',
          signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          // Terms of service url.
          tosUrl: 'tos.html',
          // Privacy policy url.
          privacyPolicyUrl: 'privacy.html'
      };
      ui.start('#firebaseui-auth-container', uiConfig);
  }
});


        n =  new Date();
        y = n.getFullYear();
        m = n.getMonth() + 1;
        d = n.getDate();
        
        var time = new Date();
        
        var current_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        
        document.getElementById('subBtn').onclick = function(){
           
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
            
            firebase.database().ref().child('contact').push({
                id: 'Guest',
                name: name + ' - Guest', 
                email: email + ' - Guest',
                subject : subject,
                message: message,
                feed_date: d + "/" + m + "/" + y,
                feed_time: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            });
            alert('Your query is sent to our representative.');
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            // location.reload();
            // end of storing data
        };