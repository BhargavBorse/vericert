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

firebase.database().ref().child('contact').on('child_added',function(feed_snapshot){
    
    var email_fetch = feed_snapshot.child('email').val(); 
    var name_fetch = feed_snapshot.child('name').val(); 
    var subject_fetch = feed_snapshot.child('subject').val(); 
    var message_fetch = feed_snapshot.child('message').val(); 
    var feed_date_fetch = feed_snapshot.child('feed_date').val();
    var feed_time_fetch = feed_snapshot.child('feed_time').val();
    
    var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
    
    // Insert a row in the table at the last row
    var newRow   = tableRef.insertRow(tableRef.rows.length);
    
    // Insert a cell in the row at index 0
    var email_cell = newRow.insertCell(0);
    var name_cell = newRow.insertCell(1);
    var subject_cell = newRow.insertCell(2);
    var message_cell = newRow.insertCell(3);
    var feed_date_cell = newRow.insertCell(4);
    var feed_time_cell = newRow.insertCell(5);
    
    // Append a text node to the cell
    var email_value_cell = document.createTextNode(email_fetch);
    var name_value_cell = document.createTextNode(name_fetch);
    var subject_value_cell = document.createTextNode(subject_fetch);
    var message_value_cell = document.createTextNode(message_fetch);
    var feed_date_value_cell = document.createTextNode(feed_date_fetch);
    var feed_time_value_cell = document.createTextNode(feed_time_fetch);
    
    
    email_cell.appendChild(email_value_cell);
    name_cell.appendChild(name_value_cell);
    subject_cell.appendChild(subject_value_cell);
    message_cell.appendChild(message_value_cell);
    feed_date_cell.appendChild(feed_date_value_cell);
    feed_time_cell.appendChild(feed_time_value_cell);
});