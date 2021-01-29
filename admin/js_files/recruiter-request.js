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

firebase.database().ref().child('recruiter').on('child_added',function(feed_snapshot){
    
    var name_fetch = feed_snapshot.child('name').val(); 
    var email_fetch = feed_snapshot.child('email').val(); 
    var subject_fetch = feed_snapshot.child('ins_name').val(); 
    var login_status = feed_snapshot.child('login_status').val(); 
    var id = feed_snapshot.key;
    
    if(login_status === 'inactive')
    {
        var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
        
        // Insert a row in the table at the last row
        var newRow   = tableRef.insertRow(tableRef.rows.length);
        
        // Insert a cell in the row at index 0
        var name_cell = newRow.insertCell(0);
        var email_cell = newRow.insertCell(1);
        var subject_cell = newRow.insertCell(2);
        var login_status_cell = newRow.insertCell(3);
        var det_cell = newRow.insertCell(4);
        var more_details_cell = newRow.insertCell(5);
        var action_cell = newRow.insertCell(6);
        var id_cell = newRow.insertCell(7).hidden;
        
        // Append a text node to the cell
        var name_value_cell = document.createTextNode(name_fetch);
        var email_value_cell = document.createTextNode(email_fetch);
        var subject_value_cell = document.createTextNode(subject_fetch);
        var login_status_value_cell = document.createTextNode(login_status);
        var id_value_cell = document.createTextNode(id);
        
        var alink_more_details = document.createElement("a");
        var alink_more_details_text = document.createTextNode('Activate');
        alink_more_details.appendChild(alink_more_details_text);
        alink_more_details.setAttribute('class',"btn btn-success")
        // alink_more_details.setAttribute('class',"fa fa-info")
        alink_more_details.href = "recruiter-request.html?id="+id;
        
        var dlink_more_details = document.createElement("a");
        var dlink_more_details_text = document.createTextNode('Delete');
        dlink_more_details.appendChild(dlink_more_details_text);
        dlink_more_details.setAttribute('class',"btn btn-danger")
        // alink_more_details.setAttribute('class',"fa fa-info")
        dlink_more_details.href = "blank_recruiter.html?id="+id; 

        var blink_more_details = document.createElement("a");
        var blink_more_details_text = document.createTextNode('More Detail');
        blink_more_details.appendChild(blink_more_details_text);
        blink_more_details.setAttribute('class',"btn btn-info")
        // alink_more_details.setAttribute('class',"fa fa-info")
        blink_more_details.href = "request-recruiter-detail.html?id="+id; 
        
        name_cell.appendChild(name_value_cell);
        email_cell.appendChild(email_value_cell);
        subject_cell.appendChild(subject_value_cell);
        login_status_cell.appendChild(login_status_value_cell);
        det_cell.appendChild(blink_more_details);
        more_details_cell.appendChild(alink_more_details);
        action_cell.appendChild(dlink_more_details);
        // id_cell = appendChild(id_value_cell);   
    }
});

function logout(){
    firebase.auth().signOut();
}

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        firebase.database().ref().child('recruiter').child(id).update({
            login_status: 'active'
        });
        alert('Account activated');
    }
});