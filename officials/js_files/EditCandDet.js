var profpicRef = firebase.database().ref();
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
        document.getElementById("user_para").innerHTML = email_id;    
        
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("userId");
        var CertKey = url.searchParams.get("certKey");
        
        firebase.database().ref().child('users').child(id).child('user_details').on('value',function(feed_snapshot){
            var snap = feed_snapshot.val();
            
            document.getElementById('name').value = snap.name;
            document.getElementById('email').value = snap.email;
            document.getElementById('phone_no').value = snap.phone_no;
            document.getElementById('address').value = snap.address;
            document.getElementById('gender').value = snap.gender;
            document.getElementById('dob').value = snap.dob;
            document.getElementById('ins_name').value = snap.institute;
            document.getElementById('qualification').value = snap.qualification;
            document.getElementById('enrollment').value = snap.enrollment;
            
            var ouser_name = snap.name;
            var ouser_email = snap.email;
            var ouser_qualification = snap.qualification;

            document.getElementById('file').onchange = function(event){
                selectedFile = event.target.files[0];
            }
            document.getElementById('issueCert').onclick = function(){
                
                var title = document.getElementById('title').value;
                var description = document.getElementById('description').value;
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();
                var final_date = dd+"-"+mm+"-"+yyyy;
                   
                if (title == "") {
                    alert("Title must be filled out");
                    return false;
                }
                else if(description == "")
                {
                    alert("Description must be filled out");
                    return false;
                }
                else if(file == "")
                {
                    alert("Please choose a certificate to upload");
                    return false;
                }
                
                var filename = selectedFile.name;
                var storageRef = firebase.storage().ref('/'+id+'/'+filename);
                var uploadTask = storageRef.put(selectedFile);
                uploadTask.on('state_changed',function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    alert('Upload Progress : '+progress+'%');
                },function(error){
                    
                },function(){
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                        var encrypted = CryptoJS.AES.encrypt(downloadURL,"Secret Passphrase")
                        profpicRef.child('users').child(id).child('certificates').child(CertKey).update({
                            imageURL : encrypted.toString(),
                            title: title,
                            description: description,
                            date: final_date,
                            user_name: ouser_name,
                            user_id: id,
                            user_email: ouser_email,
                            user_qualification: ouser_qualification 
                        });
                        
                    });
                    alert('Updated details of: ' +snap.name + '. Click on issued certificates to view');
                    var hid = document.getElementById('redi');
                    hid.style.visibility = 'visible';
                    // window.location.reload();
                    // document.getElementById('remove_photo').click();
                    // document.getElementById('caption_value').value = "";
                });
                
            }
        });
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});
document.getElementById('redi').onclick = (function(){
    window.location.replace('issued-history.html');
});
function logout(){
    firebase.auth().signOut();
}