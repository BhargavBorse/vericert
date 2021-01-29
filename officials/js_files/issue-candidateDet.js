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
        var officialsId = url.searchParams.get("issuerId");
        
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
                        profpicRef.child('users').child(id).child('certificates').push({
                            imageURL : encrypted.toString(),
                            // IssuerId: officialsId,
                            title: title,
                            description: description,
                            date: final_date,
                            user_name: ouser_name,
                            user_id: id,
                            user_email: ouser_email,
                            user_qualification: ouser_qualification 
                        });
                        
                    });
                    alert('Certificate issued to: ' +snap.name);
                    // window.location.reload();
                    // document.getElementById('remove_photo').click();
                    // document.getElementById('caption_value').value = "";
                });
                
            }
        });
        
        firebase.database().ref().child('users').on('child_added',function(feed_snapshot){
            var usersKey = feed_snapshot.key;
            firebase.database().ref().child('users').child(usersKey).child('certificates').on('child_added',function(feed_deep_snapshot){
                var feed_deep_key = feed_deep_snapshot.key;
                firebase.database().ref().child('users').child(usersKey).child('certificates').child(feed_deep_key).on('value',function(feed_snapshot){
                    var feed_deep = feed_snapshot.val();
                    var certKey = feed_snapshot.key;
                    
                    var issuerId = feed_snapshot.child('IssuerId').val();
                    var user_id = feed_snapshot.child('user_id').val();
                    
                    var iss_name = feed_snapshot.child('user_name').val();
                    var iss_title = feed_snapshot.child('title').val();
                    var iss_description = feed_snapshot.child('description').val();
                    var date = feed_snapshot.child('date').val();
                    
                    var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
                    
                    // Insert a row in the table at the last row
                    var newRow   = tableRef.insertRow(tableRef.rows.length);
                    
                    var aimageCell = newRow.insertCell(0);
                    
                    
                    var decrypted = CryptoJS.AES.decrypt(feed_snapshot.child('imageURL').val(), "Secret Passphrase");
                    
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
                    
                    imageCellValue.setAttribute('height','50px');
                    
                    imageCellValue.setAttribute('width','80px');
                    
                    // imageCellValue.setAttribute('max-width','50%');
                    updivcreate.appendChild(divcreate);
                    divcreate.appendChild(aimageCellValue);
                    aimageCellValue.appendChild(imageCellValue);
                    
                    aimageCell.appendChild(aimageCellValue);
                    
                    
                    var email_cell = newRow.insertCell(1);
                    var subject_cell = newRow.insertCell(2);
                    var date_cell = newRow.insertCell(3);
                    var more_details_cell = newRow.insertCell(4);
                    var delete_details_cell = newRow.insertCell(5);
                    
                    // Append a text node to the cell
                    var name_value_cell = document.createTextNode(iss_name);
                    var email_value_cell = document.createTextNode(iss_title);
                    var subject_value_cell = document.createTextNode(iss_description);
                    var date_value_cell = document.createTextNode(date);
                    
                    var alink_more_details = document.createElement("a");
                    var alink_more_details_text = document.createTextNode('Edit');
                    alink_more_details.appendChild(alink_more_details_text);
                    alink_more_details.setAttribute('class',"btn btn-danger")
                    // alink_more_details.setAttribute('class',"fa fa-info")
                    alink_more_details.href = "EditCandDet.html?userId="+user_id+"&certKey="+certKey;
                    
                    var dlink_more_details = document.createElement("a");
                    var dlink_more_details_text = document.createTextNode('Delete');
                    dlink_more_details.appendChild(dlink_more_details_text);
                    dlink_more_details.setAttribute('class',"btn btn-danger");
                    dlink_more_details.setAttribute('onclick',"deleteCert();");
                    // alink_more_details.setAttribute('class',"fa fa-info")
                    dlink_more_details.href = "blank.html?userId="+user_id+"&certKey="+certKey;
                    
                    // name_cell.appendChild(name_value_cell);
                    email_cell.appendChild(email_value_cell);
                    subject_cell.appendChild(subject_value_cell);
                    date_cell.appendChild(date_value_cell);
                    more_details_cell.appendChild(alink_more_details);
                    delete_details_cell.appendChild(dlink_more_details);
                    // id_cell = appendChild(id_value_cell);
                });
            });
        });
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});


function logout(){
    firebase.auth().signOut();
}