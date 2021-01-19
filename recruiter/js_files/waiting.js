function logout(){
    firebase.auth().signOut();
    window.location.replace('index.html');
  }
  