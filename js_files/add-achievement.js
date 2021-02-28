var database = firebase.database().ref('users');
var profpicRef = firebase.database().ref();
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // uid = user.uid;
        // if(displayName!=null)
        // {
        //     document.getElementById('userName').innerText=displayName;
        // }
        database.child(user.uid).child('user_details').on('value',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            
            document.getElementById('name').value = user_details.name;
            document.getElementById('email').value = user_details.email;
            // document.getElementById('phone_no').value = user_details.phone_no;
            // document.getElementById('address').value = user_details.address;
            // document.getElementById('dob').value = user_details.dob;
            // document.getElementById('gender').value = user_details.gender;
            // document.getElementById('qualification').value = user_details.qualification;
            // document.getElementById('institute').value = user_details.institute;
            // document.getElementById('enrollment').value = user_details.enrollment;
        });
        
        document.getElementById('file').onchange = function(event){
            selectedFile = event.target.files[0];
        }
        
        document.getElementById('add_off').onclick = function(){
            if (document.getElementById('detsForm')!=null)
            {
                var name = document.getElementById('name').value;
                var email = document.getElementById('email').value;
                var issuedBy = document.getElementById('issuedBy').value;
                var title = document.getElementById('title').value;
                var description = document.getElementById('description').value;
                var issuedDate = document.getElementById('issuedDate').value;
                var certId = document.getElementById('certId').value;
                var certUrl = document.getElementById('certUrl').value;
                var certImage = document.getElementById('file').value;
                
                var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                var regex = new RegExp(expression);
                if (certUrl.match(regex)) {
                    // alert("Successful match");
                } else {
                    alert("URL in wrong format");
                }
                
                if (name == "") {
                    alert("Name must be filled out");
                    return false;
                }
                else if(email == "")
                {
                    alert("Email must be filled out");
                    return false;
                }
                
                else if(issuedBy == "")
                {
                    alert("Issued by must be filled out");
                    return false;
                }
                else if(title == "")
                {
                    alert("Title must be filled out");
                    return false;
                }
                else if(description == "")
                {
                    alert("Description should be filled out")
                }
                else if(issuedDate == "")
                {
                    alert("Issued Date must be filled out");
                    return false;
                }
                
                else if(certId == "")
                {
                    alert("Certificate id must be filled out");
                    return false;
                }
                else if(certUrl == "")
                {
                    alert("Certificate url must be filled out");
                    return false;
                }
                else if(certImage == "")
                {
                    alert("Please browse certificate image");
                    return false;
                }
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();
                var final_date = dd+"-"+mm+"-"+yyyy;
                
                var filename = selectedFile.name;
                var storageRef = firebase.storage().ref('/'+user.uid+'/'+'achievements'+'/'+filename);
                var uploadTask = storageRef.put(selectedFile);
                uploadTask.on('state_changed',function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    alert('Upload Progress : '+progress+'%');
                },function(error){
                    
                },function(){
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                        var encrypted = CryptoJS.AES.encrypt(downloadURL,"Secret Passphrase")
                        profpicRef.child('users').child(user.uid).child('achievements').push({
                            imageURL : encrypted.toString(),
                            name: name,
                            email: email,
                            issuedBy: issuedBy,
                            title: title,
                            description: description,
                            issuedDate: issuedDate,
                            certId: certId,
                            certUrl: certUrl,
                            uploadDate: final_date
                        });
                        alert('Achievement certificate is uploaded to your bucket');
                        window.location.href='main.html';
                    });
                    // var hid = document.getElementById('redi');
                    // hid.style.visibility = 'visible';
                    // window.location.reload();
                    // document.getElementById('remove_photo').click();
                    // document.getElementById('caption_value').value = "";
                });
                
                
            }
        }
        // ...
    } else {
        // User is signed out.
        // ...
        window.location.replace('index.html');
    }
});
function profile() {
    window.location.replace('profile.html');
}

function request() {
    window.location.replace('request.html');
}

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.replace('index.html');
    }).catch(function (error) {
        // An error happened.
    });
}


// RL : encrypted.toString(),
//                             name: name,
//                             email: email,
//                             issuedBy: issuedBy,
//                             title: title,
//                             description: description,
//                             issuedDate: issuedDate,
//                             certId: certId,
//                             certUrl: certUrl,
//                             uploadDate: final_date,
//                             certImage: certImage