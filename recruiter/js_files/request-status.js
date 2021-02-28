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
        
        
        
        firebase.database().ref().child('users').on('child_added',function(feed_snapshot){
            var usersKey = feed_snapshot.key;
            firebase.database().ref().child('users').child(usersKey).child('requests').on('child_added',function(feed_deep_snapshot){
                var feed_deep_key = feed_deep_snapshot.key;
                firebase.database().ref().child('users').child(usersKey).child('requests').child(feed_deep_key).on('value',function(feed_snapshot){
                    var feed_deep = feed_snapshot.val();
                    var userUid = feed_deep.userUid;
                    
                    if(userUid === user.uid)
                    {
                        var requestTo = feed_snapshot.child('requestTo').val();
                        var institute = feed_snapshot.child('institute').val();
                        var qualification = feed_snapshot.child('qualification').val();
                        var enrollment = feed_snapshot.child('enrollment').val();
                        var user_id = feed_snapshot.child('userId').val();
                        var requesterId = feed_snapshot.child('requesterId').val();
                        var requestStatus = feed_snapshot.child('requestStatus').val();
                        
                        var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
                        
                        // Insert a row in the table at the last row
                        var newRow   = tableRef.insertRow(tableRef.rows.length);
                        
                        // Insert a cell in the row at index 0
                        var requestTo_cell = newRow.insertCell(0);
                        var institute_cell = newRow.insertCell(1);
                        var qualification_cell = newRow.insertCell(2);
                        var enrollment_cell = newRow.insertCell(3);
                        var status_cell = newRow.insertCell(4);
                        var more_details_cell = newRow.insertCell(5);
                        
                        // Append a text node to the cell
                        var requestTo_value_cell = document.createTextNode(requestTo);
                        var institute_value_cell = document.createTextNode(institute);
                        var qualification_value_cell = document.createTextNode(qualification);
                        var enrollment_value_cell = document.createTextNode(enrollment);
                        var status_value_cell = document.createTextNode(requestStatus);
                        
                        var alink_more_details = document.createElement("a");
                        var alink_more_details_text = document.createTextNode('More Detail');
                        alink_more_details.appendChild(alink_more_details_text);
                        alink_more_details.setAttribute('class',"btn btn-danger")
                        // alink_more_details.setAttribute('class',"fa fa-info")
                        alink_more_details.href = "issue-candidateDet.html?userId="+user_id+"&requesterId="+requesterId;
                        
                        
                        requestTo_cell.appendChild(requestTo_value_cell);
                        institute_cell.appendChild(institute_value_cell);
                        qualification_cell.appendChild(qualification_value_cell);
                        enrollment_cell.appendChild(enrollment_value_cell);
                        status_cell.appendChild(status_value_cell);
                        more_details_cell.appendChild(alink_more_details);
                        // id_cell = appendChild(id_value_cell);
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