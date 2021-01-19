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
    firebase.database().ref().child('users').child(usersKey).child('user_details').on('value',function(feed_deep_snapshot){
        
        var name_fetch = feed_deep_snapshot.child('name').val(); 
    
        var email_fetch = feed_deep_snapshot.child('email').val(); 
        var subject_fetch = feed_deep_snapshot.child('institute').val(); 
        var id = feed_deep_snapshot.key;
        
        var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
        
        // Insert a row in the table at the last row
        var newRow   = tableRef.insertRow(tableRef.rows.length);
        
        // Insert a cell in the row at index 0
        var name_cell = newRow.insertCell(0);
        var email_cell = newRow.insertCell(1);
        var subject_cell = newRow.insertCell(2);
        var more_details_cell = newRow.insertCell(3);
        var id_cell = newRow.insertCell(4).hidden;
        
        // Append a text node to the cell
        var name_value_cell = document.createTextNode(name_fetch);
        var email_value_cell = document.createTextNode(email_fetch);
        var subject_value_cell = document.createTextNode(subject_fetch);
        var id_value_cell = document.createTextNode(id);
        
        var alink_more_details = document.createElement("a");
        var alink_more_details_text = document.createTextNode('More Detail');
        alink_more_details.appendChild(alink_more_details_text);
        alink_more_details.setAttribute('class',"btn btn-danger")
        // alink_more_details.setAttribute('class',"fa fa-info")
        alink_more_details.href = "candidate-detail.html?id="+feed_snapshot.key;
        
        
        name_cell.appendChild(name_value_cell);
        email_cell.appendChild(email_value_cell);
        subject_cell.appendChild(subject_value_cell);
        more_details_cell.appendChild(alink_more_details);
        id_cell = appendChild(id_value_cell);
    });
});

function logout(){
    firebase.auth().signOut();
}