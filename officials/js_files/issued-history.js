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
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});

firebase.database().ref().child('users').on('child_added',function(feed_snapshot){
    var usersKey = feed_snapshot.key;
    firebase.database().ref().child('users').child(usersKey).child('certificates').on('child_added',function(feed_deep_snapshot){
        var feed_deep_key = feed_deep_snapshot.key;
        firebase.database().ref().child('users').child(usersKey).child('certificates').child(feed_deep_key).on('value',function(feed_snapshot){
            var feed_deep = feed_snapshot.val();
            
            var issuerId = feed_snapshot.child('IssuerId').val();
            var user_id = feed_snapshot.child('user_id').val();
            
            var iss_name = feed_snapshot.child('user_name').val();
            var iss_email = feed_snapshot.child('user_email').val();
            var iss_qualification = feed_snapshot.child('user_qualification').val();
            var date = feed_snapshot.child('date').val();
            
            var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
            
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);
            
            // Insert a cell in the row at index 0
            var name_cell = newRow.insertCell(0);
            var email_cell = newRow.insertCell(1);
            var subject_cell = newRow.insertCell(2);
            var date_cell = newRow.insertCell(3);
            var more_details_cell = newRow.insertCell(4);
            
            // Append a text node to the cell
            var name_value_cell = document.createTextNode(iss_name);
            var email_value_cell = document.createTextNode(iss_email);
            var subject_value_cell = document.createTextNode(iss_qualification);
            var date_value_cell = document.createTextNode(date);
            
            var alink_more_details = document.createElement("a");
            var alink_more_details_text = document.createTextNode('More Detail');
            alink_more_details.appendChild(alink_more_details_text);
            alink_more_details.setAttribute('class',"btn btn-danger")
            // alink_more_details.setAttribute('class',"fa fa-info")
            alink_more_details.href = "issue-candidateDet.html?userId="+user_id+"&issuerId="+issuerId;
            
            
            name_cell.appendChild(name_value_cell);
            email_cell.appendChild(email_value_cell);
            subject_cell.appendChild(subject_value_cell);
            date_cell.appendChild(date_value_cell);
            more_details_cell.appendChild(alink_more_details);
            // id_cell = appendChild(id_value_cell);
        });
    });
});

function logout(){
    firebase.auth().signOut();
}