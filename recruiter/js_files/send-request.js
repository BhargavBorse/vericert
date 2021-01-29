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
        
        firebase.database().ref().child('recruiter').on('child_added',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            var key = user_details_snapshot.key;
            
            if(user.email == user_details.email){
                // alert('inactive');
                // document.getElementById('name').value = user_details.name;
                // document.getElementById('email').value = user_details.email;
                // document.getElementById('phone_no').value = user_details.phone_no;
                // document.getElementById('address').value = user_details.address;
                // document.getElementById('gender').value = user_details.gender;
                // document.getElementById('dob').value = user_details.dob;
                // document.getElementById('institute').value = user_details.ins_name;
                // document.getElementById('ins_add').value = user_details.ins_add;
                // document.getElementById('designation').value = user_details.designation;
                // document.getElementById('e_id').value = user_details.e_id;
                // document.getElementById('role').value = user_details.role;
                
                
                
                document.getElementById('add_off').onclick = function()
                {
                    // var name = document.getElementById('name').value;
                    // var email = document.getElementById('email').value;
                    // var phone_no =  document.getElementById('phone_no').value;
                    // var address = document.getElementById('address').value;
                    // var gender = document.getElementById('gender').value;
                    // var dob = document.getElementById('dob').value;
                    // var ins_name = document.getElementById('institute').value;
                    // var ins_add = document.getElementById('ins_add').value;
                    // var qualification = document.getElementById('qualification').value;
                    // var e_id = document.getElementById('e_id').value;
                    // var role = document.getElementById('role').value;
                    var inputId = document.getElementById('enroll_no').value;
                    
                    firebase.database().ref().child('users').on('child_added',function(feed_snapshot){
                        var usersKey = feed_snapshot.key;
                        firebase.database().ref().child('users').child(usersKey).child('user_details').on('value',function(feed_deep_snapshot){
                            feed_snap = feed_deep_snapshot.val();
                            
                            var name_fetch = feed_deep_snapshot.child('name').val(); 
                            
                            var email_fetch = feed_deep_snapshot.child('email').val(); 
                            var enroll = feed_deep_snapshot.child('enrollment').val(); 
                            var id = feed_deep_snapshot.key;
                            var institute = feed_snap.institute;
                            var qualification_in = feed_snap.qualification;
                            
                            if(inputId === enroll)
                            {

                                var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
                                
                                // Insert a row in the table at the last row
                                var newRow   = tableRef.insertRow(tableRef.rows.length);
                                
                                // Insert a cell in the row at index 0
                                var name_cell = newRow.insertCell(0);
                                var email_cell = newRow.insertCell(1);
                                var enroll_cell = newRow.insertCell(2);
                                var course_cell = newRow.insertCell(3);
                                var more_details_cell = newRow.insertCell(4);
                                var id_cell = newRow.insertCell(5).hidden;
                                
                                // Append a text node to the cell
                                var name_value_cell = document.createTextNode(name_fetch);
                                var email_value_cell = document.createTextNode(email_fetch);
                                var enroll_value_cell = document.createTextNode(enroll);
                                var course_value_cell = document.createTextNode(qualification_in);
                                var id_value_cell = document.createTextNode(id);
                                
                                var alink_more_details = document.createElement("a");
                                var alink_more_details_text = document.createTextNode('More Detail');
                                alink_more_details.appendChild(alink_more_details_text);
                                alink_more_details.setAttribute('class',"btn btn-danger")
                                // alink_more_details.setAttribute('class',"fa fa-info")
                                alink_more_details.href = "candidate-detail.html?id="+feed_snapshot.key+"&recruiterKey="+key;
                                
                                
                                name_cell.appendChild(name_value_cell);
                                email_cell.appendChild(email_value_cell);
                                enroll_cell.appendChild(enroll_value_cell);
                                course_cell.appendChild(course_value_cell);
                                more_details_cell.appendChild(alink_more_details);
                                // id_cell = appendChild(id_value_cell);
                            }
                            else
                            {
                                alert('No such record found!');
                            }
                        });
                    });
                    // firebase.database().ref().child('officials').child(key).update({
                    //     name: name,
                    //     email: email,
                    //     phone_no: phone_no,
                    //     address: address,
                    //     gender: gender,
                    //     dob: dob,
                    //     ins_name: ins_name,
                    //     ins_add: ins_add,
                    //     designation: designation,
                    //     e_id: e_id,
                    //     role: role
                    // });
                    // alert('Updated');
                }
            }
        });
        
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});

function forgot_password(){
    
    var auth = firebase.auth();
    var userEmail = document.getElementById("email").value;
    alert(userEmail);
    auth.sendPasswordResetEmail(userEmail).then(function() {
        // Email sent.
        window.alert("To reset password please check your email");
    }).catch(function(error) {
        // An error happened.
        var errorMessage = error.message;
        // ..
        window.alert("Error : " + errorMessage);
    });
    
}

function logout(){
    firebase.auth().signOut();
}