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
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        
        database.child(user.uid).child('achievements').child(id).on('value',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            
            var aimageCell = document.createElement('div');
            document.getElementsByClassName('certImage')[0].appendChild(aimageCell);
            var decrypted = CryptoJS.AES.decrypt(user_details_snapshot.child('imageURL').val(), "Secret Passphrase");
            
            var updivcreate = document.createElement('div');
            var divcreate = document.createElement('div');
            divcreate.className = 'image';
            updivcreate.className = 'item';
            var aimageCellValue = document.createElement('a');
            
            aimageCellValue.setAttribute('href',decrypted.toString(CryptoJS.enc.Utf8));
            
            aimageCellValue.setAttribute('data-lightbox','image');
            
            aimageCellValue.setAttribute('target','_blank');
            
            var imageCellValue = document.createElement('img');
            
            imageCellValue.setAttribute('src',decrypted.toString(CryptoJS.enc.Utf8));
            
            // imageCellValue.setAttribute('class','image');
            
            // imageCellValue.style.borderRadius = "50%";
            
            // imageCellValue.setAttribute('border-radius','50%');
            
            imageCellValue.setAttribute('height','250px');
            
            imageCellValue.setAttribute('width','350px');
            imageCellValue.setAttribute('style','padding-bottom: 15px;');
            // imageCellValue.setAttribute('max-width','50%');
            updivcreate.appendChild(divcreate);
            divcreate.appendChild(aimageCellValue);
            aimageCellValue.appendChild(imageCellValue);
            
            aimageCell.appendChild(aimageCellValue);
            
            
            
            
            document.getElementById('name').value = user_details.name;
            document.getElementById('email').value = user_details.email;
            document.getElementById('issuedBy').value = user_details.issuedBy;
            document.getElementById('title').value = user_details.title;
            document.getElementById('description').value = user_details.description;
            document.getElementById('issuedDate').value = user_details.issuedDate;
            document.getElementById('certId').value = user_details.certId;
            document.getElementById('certUrl').value = user_details.certUrl;
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
                    alert("No updates in new certificate");
                    // return false;
                }
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();
                var final_date = dd+"-"+mm+"-"+yyyy;
                document.getElementById('file').onchange = function(event){
                    selectedFile = event.target.files[0];
                }
                var filename = selectedFile.name;
                // var filename = document.getElementById('file').value;
                var storageRef = firebase.storage().ref('/'+user.uid+'/'+'achievements'+'/'+filename);
                var uploadTask = storageRef.put(selectedFile);
                uploadTask.on('state_changed',function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    alert('Upload Progress : '+progress+'%');
                },function(error){
                    
                },function(){
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                        var encrypted = CryptoJS.AES.encrypt(downloadURL,"Secret Passphrase")
                        profpicRef.child('users').child(user.uid).child('achievements').child(id).update({
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
                        alert('Achievement certificate is updated');
                        // window.location.href='main.html';
                    });
                    // var hid = document.getElementById('redi');
                    // hid.style.visibility = 'visible';
                    // window.location.reload();
                    // document.getElementById('remove_photo').click();
                    // document.getElementById('caption_value').value = "";
                });
                
                
            }
        }
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