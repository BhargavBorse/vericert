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
        var recruiterId = url.searchParams.get("recruiterKey");
        firebase.database().ref().child('recruiter').child(recruiterId).on('value', function (rec_snapshot)
        {
            var rec_snap = rec_snapshot.val();

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
                
                var ouser_name = snap.name;
                var ouser_email = snap.email;
                var ouser_qualification = snap.qualification;
                
                // firebase.database().ref().child('users').child(id).child('certificates').on('child_added',function(cert_snapshot){
                //     var cert_det = cert_snapshot.key;
                
                //     firebase.database().ref().child('users').child(id).child('certificates').child(cert_det).on('value',function(cert_deep_snapshot){
                //         var cert_deep_det = cert_deep_snapshot.val();
                
                // var labelTag = document.createElement('label');
                // var labelText = document.createTextNode(cert_deep_det.title);
                // labelTag.appendChild(labelText);
                
                // document.getElementsByClassName('checkbox_input')[0].appendChild(labelTag);
                
                // var inputDiv = document.createElement('input');
                // inputDiv.className = "cert1";
                // inputDiv.setAttribute('type', 'checkbox');
                // inputDiv.setAttribute('class', 'cert1');
                // inputDiv.setAttribute('name', 'cert1');
                // inputDiv.setAttribute('id', 'cert1');
                // inputDiv.setAttribute('value',cert_deep_det.title);
                // labelTag.appendChild(inputDiv);
                
                // var noCert = document.getElementById('certNull');
                // noCert.style.visibility = 'hidden';
                
                
                n =  new Date();
                y = n.getFullYear();
                m = n.getMonth() + 1;
                d = n.getDate();
                
                var expiry_date = d + 3;
                
                document.getElementById('issueCert').onclick = function(){
                    
                    firebase.database().ref().child('users').child(id).child('requests').push({
                        requesterId: recruiterId,
                        expiryDate: '00/00/0000',
                        requestDate: d + "/" + m + "/" + y,
                        requestTo: snap.name,
                        institute: snap.institute,
                        enrollment: snap.enrollment,
                        qualification: snap.qualification,
                        requestBy: email_id,
                        recName: rec_snap.name,
                        insName: rec_snap.ins_name,
                        insAddress: rec_snap.ins_add,
                        recDesignation: rec_snap.designation,
                        userId: id,
                        requestStatus: 'pending',
                        userUid: user.uid
                    });
                    alert('Request Sent. Please click on view request to view status.');
                    var hid = document.getElementById('viewReq');
                    hid.style.visibility = 'visible';
                }   // alert(cert_deep_det.title);
            });
        });
        //     });
        // });
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});

document.getElementById('viewReq').onclick = (function(){
    window.location.replace('request-status.html');
});

function logout(){
    firebase.auth().signOut();
}