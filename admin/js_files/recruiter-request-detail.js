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
        
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        // alert(id);
        
        
        firebase.database().ref().child('recruiter').child(id).on('value',function(feed_snapshot){
            var snap = feed_snapshot.val();
            
            document.getElementById('name').value = snap.name;
            document.getElementById('email').value = snap.email;
            document.getElementById('phone_no').value = snap.phone_no;
            document.getElementById('address').value = snap.address;
            document.getElementById('gender').value = snap.gender;
            document.getElementById('status').value = snap.login_status;
            document.getElementById('dob').value = snap.dob;
            document.getElementById('ins_name').value = snap.ins_name;
            document.getElementById('ins_add').value = snap.ins_add;
            document.getElementById('designation').value = snap.designation;
            document.getElementById('e_id').value = snap.e_id;
            document.getElementById('role').value = snap.role;
            
            var aimageCell = document.createElement('div');
            document.getElementsByClassName('certImage')[0].appendChild(aimageCell);
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
            
            imageCellValue.setAttribute('height','150px');
            
            imageCellValue.setAttribute('width','180px');
            imageCellValue.setAttribute('style','padding-bottom: 15px;');
            // imageCellValue.setAttribute('max-width','50%');
            updivcreate.appendChild(divcreate);
            divcreate.appendChild(aimageCellValue);
            aimageCellValue.appendChild(imageCellValue);
            
            aimageCell.appendChild(aimageCellValue);
            
            var delFound = document.getElementById('deleteRequest');

            var alink_more_details = document.createElement("a");
            var alink_more_details_text = document.createTextNode('Delete user');
            alink_more_details.appendChild(alink_more_details_text);
            alink_more_details.setAttribute('class',"btn btn-danger")
            // alink_more_details.setAttribute('class',"fa fa-info")
            alink_more_details.href = "blank_recruiter.html?id="+id;

            delFound.appendChild(alink_more_details);
        });
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
function inactive()
{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref().child('recruiter').child(id).update({
                login_status: 'active'
            });
            alert('Account activated');
            var hid = document.getElementById('redi');
            hid.style.visibility = 'visible';
        }
    });
}
function logout(){
    firebase.auth().signOut();
}
document.getElementById('redi').onclick = (function(){
    window.location.replace('view-recruiter.html');
});
document.getElementById('back').onclick = (function(){
    window.location.replace('recruiter-request.html');
});