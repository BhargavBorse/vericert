var eventRef = firebase.database().ref('users');

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        uid = user.uid;
        if(displayName!=null)
        {
            document.getElementById('userName').innerText=displayName;
        }
        // ...
    } else {
        // User is signed out.
        // ...
        window.location.replace('index.html');
    }
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // console.log(user.uid);
        // console.log(user.email);
        eventRef.child(user.uid).child('user_details').on('value',function(return_value){
            return_value_value = return_value.val();
            
            eventRef.child(user.uid).child('requests').on('child_added',function(return_deep_value){
                var return_deep = return_deep_value.key;
                eventRef.child(user.uid).child('requests').child(return_deep).on('value',function(return_deep_deep_value){
                    var return_det = return_deep_deep_value.val();
                    
                    var recName = return_det.recName;
                    var insName = return_det.insName;
                    var date_fetch = return_det.requestDate;
                    var status = return_det.requestStatus;
                    
                    if(status === 'pending' || status === 'accepted' || status=== 'rejected')
                    {
                        var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
                        
                        // Insert a row in the table at the last row
                        var newRow   = tableRef.insertRow(tableRef.rows.length);
                        
                        
                        // Insert a cell in the row at index 0
                        var title_cell = newRow.insertCell(0);
                        var description_cell = newRow.insertCell(1);
                        var date_cell = newRow.insertCell(2);
                        var status_cell = newRow.insertCell(3);
                        var more_details_cell = newRow.insertCell(4);
                        var accept_cell = newRow.insertCell(5);
                        // var id_cell = newRow.insertCell(4).hidden;
                        
                        // Append a text node to the cell
                        var title_value_cell = document.createTextNode(recName);
                        var description_value_cell = document.createTextNode(insName);
                        var date_value_cell = document.createTextNode(date_fetch);
                        var status_value_cell = document.createTextNode(status);
                        // var id_value_cell = document.createTextNode(id);
                        
                        var alink_more_details = document.createElement("a");
                        var alink_more_details_text = document.createTextNode('More Detail');
                        alink_more_details.appendChild(alink_more_details_text);
                        alink_more_details.setAttribute('class',"btn btn-info");
                        alink_more_details.setAttribute('style','border: none;')
                        // alink_more_details.setAttribute('class',"fa fa-info")
                        alink_more_details.href = "request-detail.html?id="+return_deep;
                        
                        var acclink_more_details = document.createElement("a");
                        var acclink_more_details_text = document.createTextNode('Take Action');
                        acclink_more_details.appendChild(acclink_more_details_text);
                        acclink_more_details.setAttribute('class',"btn btn-danger");
                        acclink_more_details.setAttribute('style','border: none;')
                        // alink_more_details.setAttribute('class',"fa fa-info")
                        acclink_more_details.href = "blankAction.html?id="+return_deep;

                        title_cell.appendChild(title_value_cell);
                        description_cell.appendChild(description_value_cell);
                        date_cell.appendChild(date_value_cell);
                        status_cell.appendChild(status_value_cell);
                        more_details_cell.appendChild(alink_more_details);
                        accept_cell.appendChild(acclink_more_details);
                        // id_cell = appendChild(id_value_cell);    
                    }
                    else if(status === 'expired')
                    {
                        var tableRef = document.getElementById('feedbacktable').getElementsByTagName('tbody')[0];
                        
                        // Insert a row in the table at the last row
                        var newRow   = tableRef.insertRow(tableRef.rows.length);
                        
                        
                        // Insert a cell in the row at index 0
                        var title_cell = newRow.insertCell(0);
                        var description_cell = newRow.insertCell(1);
                        var date_cell = newRow.insertCell(2);
                        var status_cell = newRow.insertCell(3);
                        var more_details_cell = newRow.insertCell(4);
                        var accept_cell = newRow.insertCell(5);
                        // var id_cell = newRow.insertCell(4).hidden;
                        
                        // Append a text node to the cell
                        var title_value_cell = document.createTextNode(recName);
                        var description_value_cell = document.createTextNode(insName);
                        var date_value_cell = document.createTextNode(date_fetch);
                        var status_value_cell = document.createTextNode(status);
                        // var id_value_cell = document.createTextNode(id);
                        
                        var alink_more_details = document.createElement("a");
                        var alink_more_details_text = document.createTextNode('More Detail');
                        alink_more_details.appendChild(alink_more_details_text);
                        alink_more_details.setAttribute('class',"btn btn-info");
                        alink_more_details.setAttribute('style','border: none;')
                        // alink_more_details.setAttribute('class',"fa fa-info")
                        alink_more_details.href = "request-detail.html?id="+return_deep;
                        
                        var acclink_more_details = document.createElement("a");
                        var acclink_more_details_text = document.createTextNode('Take Action');
                        acclink_more_details.appendChild(acclink_more_details_text);
                        acclink_more_details.setAttribute('class',"btn btn-danger disabled");
                        acclink_more_details.setAttribute('style','border: none;')
                        // alink_more_details.setAttribute('class',"fa fa-info")
                        acclink_more_details.href = "";
                        
                        title_cell.appendChild(title_value_cell);
                        description_cell.appendChild(description_value_cell);
                        date_cell.appendChild(date_value_cell);
                        status_cell.appendChild(status_value_cell);
                        more_details_cell.appendChild(alink_more_details);
                        accept_cell.appendChild(acclink_more_details);
                        // id_cell = appendChild(id_value_cell); 
                    }
                });
            });
        });
    }
});

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.replace('index.html');
    }).catch(function (error) {
        // An error happened.
    });
}

function profile() {
    window.location.replace('profile.html');
}

function request() {
    window.location.replace('request.html');
}


// var itemDiv = document.createElement('div');
// itemDiv.className = "item col-md-4";

// // itemDiv.className = "col-md-4"
// document.getElementsByClassName('owl-carousel')[0].appendChild(itemDiv);

// var imageDiv = document.createElement('div');
// imageDiv.className = "image";
// var decrypted = CryptoJS.AES.decrypt(return_deep_deep_value.child('imageURL').val(), "Secret Passphrase");

// var aTag = document.createElement('a');
// aTag.setAttribute('data-lightbox','image');
// aTag.setAttribute('href',decrypted.toString(CryptoJS.enc.Utf8));

// var imgTag = document.createElement('img');
// imgTag.setAttribute('src',decrypted.toString(CryptoJS.enc.Utf8));
// imgTag.setAttribute('style','width: 320px; height: 230px;');

// aTag.appendChild(imgTag);
// imageDiv.appendChild(aTag);
// itemDiv.appendChild(imageDiv);

// var contentDiv = document.createElement('div');
// contentDiv.className = 'text-content';

// var hTag = document.createElement('h4');
// var hTagContent = document.createTextNode(return_det.title);
// hTag.appendChild(hTagContent);
// hTag.className = "text-capitalize";
// hTag.setAttribute('style','width: 320px;');
// // var hTagText = document.createTextNode('Bachelor of Computer Application');
// contentDiv.appendChild(hTag);

// var spanTag = document.createElement('span');
// var spanTagContent = document.createTextNode(return_det.institute_name);
// spanTag.appendChild(spanTagContent);
// contentDiv.appendChild(spanTag);

// var pTag = document.createElement('p');
// var pTagContent = document.createTextNode(return_det.description);
// pTag.appendChild(pTagContent);
// contentDiv.appendChild(pTag);


// itemDiv.appendChild(contentDiv);