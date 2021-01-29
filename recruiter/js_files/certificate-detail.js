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
        var id = url.searchParams.get("userId");
        var certKey = url.searchParams.get("certKey");
        
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
            document.getElementById('enrollment').value = snap.enrollment;
        });
        
        firebase.database().ref().child('users').on('child_added',function(feed_snapshot){
            var usersKey = feed_snapshot.key;
            
            firebase.database().ref().child('users').child(usersKey).child('certificates').child(certKey).on('value',function(req_snapshot){
                var req_deep = req_snapshot.val();
                
                document.getElementById('title').value = req_deep.title;
                document.getElementById('description').value = req_deep.description;
                document.getElementById('issuedBy').value = req_deep.institute_name;
                document.getElementById('issueDate').value = req_deep.date;
                
                var aimageCell = document.createElement('div');
                document.getElementsByClassName('certImage')[0].appendChild(aimageCell);
                var decrypted = CryptoJS.AES.decrypt(req_snapshot.child('imageURL').val(), "Secret Passphrase");
                
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
                
                imageCellValue.setAttribute('height','250px');
                
                imageCellValue.setAttribute('width','350px');
                imageCellValue.setAttribute('style','padding-bottom: 15px;');
                // imageCellValue.setAttribute('max-width','50%');
                updivcreate.appendChild(divcreate);
                divcreate.appendChild(aimageCellValue);
                aimageCellValue.appendChild(imageCellValue);
                
                aimageCell.appendChild(aimageCellValue);
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