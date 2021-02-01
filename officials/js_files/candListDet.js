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
        var id = url.searchParams.get("id");
        var officialsId = url.searchParams.get("usersKey");
        
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
            
            firebase.database().ref().child('users').on('child_added',function(feed_snap){
                var usersKey = feed_snap.key;
                firebase.database().ref().child('users').child(usersKey).child('requests').on('child_added',function(feed_deep_snapshot){
                    var feed_deep_key = feed_deep_snapshot.key;
                    firebase.database().ref().child('users').child(usersKey).child('requests').child(feed_deep_key).on('value',function(feed_snapshot){
                        var feed_deep = feed_snapshot.val();
                        var certKey = feed_snapshot.key;
                        
                        var recName = feed_snapshot.child('recName').val();
                        var requestBy = feed_snapshot.child('requestBy').val();
                        var recDesignation = feed_snapshot.child('recDesignation').val();
                        var insName = feed_snapshot.child('insName').val();
                        var insAddress = feed_snapshot.child('insAddress').val();
                        var requestDate = feed_snapshot.child('requestDate').val();
                        var expiryDate = feed_snapshot.child('expiryDate').val();
                        var requestStatus = feed_snapshot.child('requestStatus').val();
                        
                        var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
                        
                        // Insert a row in the table at the last row
                        var newRow   = tableRef.insertRow(tableRef.rows.length);
                        
                        var recNameCell = newRow.insertCell(0);
                        var requestBy_cell = newRow.insertCell(1);
                        var reDesignation_cell = newRow.insertCell(2);
                        var insName_cell = newRow.insertCell(3);
                        var insAddress_cell = newRow.insertCell(4);
                        var requestDate_cell = newRow.insertCell(5);
                        var expiryDate_cell = newRow.insertCell(6);
                        var requestStatus_cell = newRow.insertCell(7);
                        
                        // Append a text node to the cell
                        var recName_value_cell = document.createTextNode(recName);
                        var requestBy_value_cell = document.createTextNode(requestBy);
                        var recDesignation_value_cell = document.createTextNode(recDesignation);
                        var insName_value_cell = document.createTextNode(insName);
                        var insAddress_value_cell = document.createTextNode(insAddress);
                        var requestDate_value_cell = document.createTextNode(requestDate);
                        var expiryDate_value_cell = document.createTextNode(expiryDate);
                        var requestStatus_value_cell = document.createTextNode(requestStatus);
                        var id_value_cell = document.createTextNode(id);
                        
                        recNameCell.appendChild(recName_value_cell);
                        requestBy_cell.appendChild(requestBy_value_cell);
                        reDesignation_cell.appendChild(recDesignation_value_cell);
                        insName_cell.appendChild(insName_value_cell);
                        insAddress_cell.appendChild(insAddress_value_cell);
                        requestDate_cell.appendChild(requestDate_value_cell);
                        expiryDate_cell.appendChild(expiryDate_value_cell);
                        requestStatus_cell.appendChild(requestStatus_value_cell);
                    });
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