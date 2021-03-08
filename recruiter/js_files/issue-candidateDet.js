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
        var requesterId = url.searchParams.get("requesterId");
        var reqId = url.searchParams.get("reqId");
        
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
            document.getElementById('enrollment').value = snap.enrollment;
        });
        
        firebase.database().ref().child('users').on('child_added',function(feed_snapshot){
            var usersKey = feed_snapshot.key;
            
            firebase.database().ref().child('users').child(usersKey).child('requests').on('child_added',function(req_deep_snapshot){
                var req_deep_key = req_deep_snapshot.key;
                firebase.database().ref().child('users').child(usersKey).child('requests').child(req_deep_key).on('value',function(req_snapshot){
                    var req_deep = req_snapshot.val();
                    document.getElementById('expiryDate').value = req_deep.expiryDate;
                    var status = req_deep.requestStatus;
                    
                    n =  new Date();
                    y = n.getFullYear();
                    m = n.getMonth() + 1;
                    d = n.getDate();
                    
                    if(status === 'accepted')
                    {
                        if(req_deep.expiryDate == d + "/" + m + "/" + y)
                        {
                            firebase.database().ref().child('users').child(id).child('requests').child(req_deep_key).update({
                                requestStatus: 'expired'
                            });
                            alert('Your request has expired.');
                            document.getElementById('status').innerHTML = status;
                            
                            var status_hide = document.getElementById('reject');
                            status_hide.style.visibility = 'hidden';
                        }
                        else
                        {
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
                                    
                                    // Append a text node to the cell
                                    var name_value_cell = document.createTextNode(iss_name);
                                    var email_value_cell = document.createTextNode(iss_title);
                                    var subject_value_cell = document.createTextNode(iss_description);
                                    var date_value_cell = document.createTextNode(date);
                                    
                                    var alink_more_details = document.createElement("a");
                                    var alink_more_details_text = document.createTextNode('More Detail');
                                    alink_more_details.appendChild(alink_more_details_text);
                                    alink_more_details.setAttribute('class',"btn btn-danger")
                                    // alink_more_details.setAttribute('class',"fa fa-info")
                                    alink_more_details.href = "certificate-detail.html?userId="+user_id+"&certKey="+certKey;
                                    
                                    // name_cell.appendChild(name_value_cell);
                                    email_cell.appendChild(email_value_cell);
                                    subject_cell.appendChild(subject_value_cell);
                                    date_cell.appendChild(date_value_cell);
                                    more_details_cell.appendChild(alink_more_details);
                                    // id_cell = appendChild(id_value_cell);
                                    
                                    var status_hide = document.getElementById('status_hide');
                                    status_hide.style.visibility = 'hidden';
                                    
                                    document.getElementById('reject').onclick = function(){
                                        
                                        firebase.database().ref().child('users').child(id).child('requests').child(req_deep_key).update({
                                            requestStatus: 'rejected'
                                        });
                                        alert('Request Inactivated');
                                    }
                                });
                            });
                        }
                    }
                    else if(status === 'pending')
                    {
                        document.getElementById('status').innerHTML = status;
                        
                        document.getElementById('reject').onclick = function(){
                            
                            firebase.database().ref().child('users').child(id).child('requests').child(req_deep_key).update({
                                requestStatus: 'rejected'
                            });
                            alert('Request Inactivated');
                        }
                    }
                    else
                    {
                        document.getElementById('status').innerHTML = status;
                        
                        var status_hide = document.getElementById('reject');
                        status_hide.style.visibility = 'hidden';
                    }
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