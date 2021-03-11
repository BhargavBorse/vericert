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
        
        firebase.database().ref().child('officials').on('child_added',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            var key = user_details_snapshot.key;
            
            if(user.email == user_details.email){
                // alert('inactive');
                



                var user_details = user_details_snapshot.val();
                
                var aimageCellid = document.createElement('div');
                document.getElementsByClassName('insImage')[0].appendChild(aimageCellid);
                var decryptedid = CryptoJS.AES.decrypt(user_details_snapshot.child('imageURL').val(), "Secret Passphrase");
                
                var updivcreateid = document.createElement('div');
                var divcreateid = document.createElement('div');
                divcreateid.className = 'image';
                updivcreateid.className = 'item';
                var aimageCellValueid = document.createElement('a');
                
                aimageCellValueid.setAttribute('href',decryptedid.toString(CryptoJS.enc.Utf8));
                
                aimageCellValueid.setAttribute('data-lightbox','image');
                
                aimageCellValueid.setAttribute('target','_blank');
                
                var imageCellValueid = document.createElement('img');
                
                imageCellValueid.setAttribute('src',decryptedid.toString(CryptoJS.enc.Utf8));
                
                // imageCellValue.setAttribute('class','image');
                
                // imageCellValue.style.borderRadius = "50%";
                
                // imageCellValue.setAttribute('border-radius','50%');
                
                imageCellValueid.setAttribute('height','250px');
                
                imageCellValueid.setAttribute('width','350px');
                imageCellValueid.setAttribute('style','padding-bottom: 15px;');
                // imageCellValue.setAttribute('max-width','50%');
                updivcreateid.appendChild(divcreateid);
                divcreateid.appendChild(aimageCellValueid);
                aimageCellValueid.appendChild(imageCellValueid);
                
                aimageCellid.appendChild(aimageCellValueid);




                var user_details = user_details_snapshot.val();
                
                var aimageCell = document.createElement('div');
                document.getElementsByClassName('certImage')[0].appendChild(aimageCell);
                var decrypted = CryptoJS.AES.decrypt(user_details_snapshot.child('idImageURL').val(), "Secret Passphrase");
                
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
                
                
                
                document.getElementById('name').value = user_details.name;
                document.getElementById('email').value = user_details.email;
                document.getElementById('phone_no').value = user_details.phone_no;
                document.getElementById('address').value = user_details.address;
                document.getElementById('gender').value = user_details.gender;
                document.getElementById('dob').value = user_details.dob;
                document.getElementById('ins_name').value = user_details.ins_name;
                document.getElementById('ins_add').value = user_details.ins_add;
                document.getElementById('designation').value = user_details.designation;
                document.getElementById('e_id').value = user_details.e_id;
                document.getElementById('role').value = user_details.role;
                
                
                document.getElementById('add_off').onclick = function()
                {
                    var name = document.getElementById('name').value;
                    var email = document.getElementById('email').value;
                    var phone_no =  document.getElementById('phone_no').value;
                    var address = document.getElementById('address').value;
                    var gender = document.getElementById('gender').value;
                    var dob = document.getElementById('dob').value;
                    var ins_name = document.getElementById('ins_name').value;
                    var ins_add = document.getElementById('ins_add').value;
                    var designation = document.getElementById('designation').value;
                    var e_id = document.getElementById('e_id').value;
                    var role = document.getElementById('role').value;
                    
                    if(name == "" )
                    {
                        alert('Name must be filled out.');
                        return false;
                    }
                    else if(email == "")
                    {   
                        alert('Email must be filled out.');
                        return false;
                    }
                    else if(phone_no == "")
                    {   
                        alert('Phone number must be filled out.');
                        return false;
                    }
                    else if(phone_no.length != 10)
                    {
                        alert("Phone number is in wrong format ");
                        return false;
                    }
                    else if(address == "")
                    {   
                        alert('Address must be filled out.');
                        return false;
                    }
                    else if(gender == "")
                    {   
                        alert('Gender must be filled out.');
                        return false;
                    }
                    else if(dob == "")
                    {   
                        alert('Date of Birth must be filled out.');
                        return false;
                    }
                    else if(ins_name == "")
                    {   
                        alert('Institute name must be filled out.');
                        return false;
                    }
                    else if(ins_add == "")
                    {   
                        alert('Institute address must be filled out.');
                        return false;
                    }
                    else if(designation == "")
                    {   
                        alert('Designation must be filled out.');
                        return false;
                    }
                    else if(e_id == "")
                    {   
                        alert('Employee Id must be filled out.');
                        return false;
                    }
                    else if(role == "")
                    {   
                        alert('Role must be filled out.');
                        return false;
                    }
                    
                    
                    firebase.database().ref().child('officials').child(key).update({
                        name: name,
                        email: email,
                        phone_no: phone_no,
                        address: address,
                        gender: gender,
                        dob: dob,
                        ins_name: ins_name,
                        ins_add: ins_add,
                        designation: designation,
                        e_id: e_id,
                        role: role
                    });
                    alert('Updated');
                }
            }
            
        });
        
    } else {
        // No user is signed in.
        window.location.replace('index.html');
    }
});

// function add_off(){

//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {

//             firebase.database().ref().child('officials').on('child_added',function(user_details_snapshot){
//                 var user_details = user_details_snapshot.val();
//                 var key = user_details_snapshot.key;

//                 if(user.email == user_details.email){
//                     // alert('inactive');
//                     var name = document.getElementById('name').value;
//                     var email = document.getElementById('email').value;
//                     var phone_no =  document.getElementById('phone_no').value;
//                     var address = document.getElementById('address').value;
//                     var gender = document.getElementById('gender').value = user_details.gender;
//                     var dob = document.getElementById('dob').value;
//                     var ins_name = document.getElementById('ins_name').value;
//                     var ins_add = document.getElementById('ins_add').value;
//                     var designation = document.getElementById('designation').value;
//                     var e_id = document.getElementById('e_id').value;
//                     var role = document.getElementById('role').value;

//                     firebase.database().ref().child('officials').child(key).update({
//                         name: name,
//                         email: email,
//                         phone_no: phone_no,
//                         address: address,
//                         gender: gender,
//                         dob: dob,
//                         ins_name: ins_name,
//                         ins_add: ins_add,
//                         designation: designation,
//                         e_id: e_id,
//                         role: role
//                     });
//                     alert('Updated');
//                 }
//             });
//         }
//     });    
// }

function forgot_password(){
    
    var auth = firebase.auth();
    var userEmail = document.getElementById("email").value;
    alert(userEmail);
    auth.sendPasswordResetEmail(userEmail).then(function() {
        // Email sent.
        window.alert("To reset password please check your email");
    }).catch(function(error) {
        // An error happened.
        var errorMessage = error.message;
        // ..
        window.alert("Error : " + errorMessage);
    });
    
}

function logout(){
    firebase.auth().signOut();
}