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
    firebase.database().ref().child('users').child(usersKey).child('certificates').on('value',function(feed_deep_snapshot){
        var feed_deep_name = feed_deep_snapshot.key;
        
        if(feed_deep_name === 'certificates')
        {
            
            firebase.database().ref().child('users').child(usersKey).child('user_details').on('value',function(snapshot_user){
                var feed_deep_user = snapshot_user.val();
                
                var iss_name = feed_deep_user.name;
                var iss_email = feed_deep_user.email;
                var iss_qualification = feed_deep_user.qualification;
                
                var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
                
                // Insert a row in the table at the last row
                var newRow   = tableRef.insertRow(tableRef.rows.length);
                
                // Insert a cell in the row at index 0
                var name_cell = newRow.insertCell(0);
                var email_cell = newRow.insertCell(1);
                var subject_cell = newRow.insertCell(2);
                // var date_cell = newRow.insertCell(3);
                var more_details_cell = newRow.insertCell(3);
                
                // Append a text node to the cell
                var name_value_cell = document.createTextNode(iss_name);
                var email_value_cell = document.createTextNode(iss_email);
                var subject_value_cell = document.createTextNode(iss_qualification);
                // var date_value_cell = document.createTextNode(date);
                
                var alink_more_details = document.createElement("a");
                var alink_more_details_text = document.createTextNode('More Detail');
                alink_more_details.appendChild(alink_more_details_text);
                alink_more_details.setAttribute('class',"btn btn-danger")
                // alink_more_details.setAttribute('class',"fa fa-info")
                alink_more_details.href = "issue-candidateDet.html?userId="+usersKey;
                
                
                name_cell.appendChild(name_value_cell);
                email_cell.appendChild(email_value_cell);
                subject_cell.appendChild(subject_value_cell);
                // date_cell.appendChild(date_value_cell);
                more_details_cell.appendChild(alink_more_details);
                // id_cell = appendChild(id_value_cell);
            });
            
        }
    });
});

function logout(){
    firebase.auth().signOut();
}