var database = firebase.database().ref('users');

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // uid = user.uid;
        // if(displayName!=null)
        // {
        //     document.getElementById('userName').innerText=displayName;
        // }
        database.child(user.uid).child('user_details').on('value',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            
            document.getElementById('name').value = user_details.name;
            document.getElementById('email').value = user_details.email;
            document.getElementById('phone_no').value = user_details.phone_no;
            document.getElementById('address').value = user_details.address;
            document.getElementById('dob').value = user_details.dob;
            document.getElementById('gender').value = user_details.gender;
            document.getElementById('qualification').value = user_details.qualification;
            document.getElementById('institute').value = user_details.institute;
        });

        document.getElementById('updtBtn').onclick = function(){
            if (document.getElementById('detsForm')!=null)
            {
                var name = document.getElementById('name').value;
                var email = document.getElementById('email').value;
                var phone_no = document.getElementById('phone_no').value;
                var address = document.getElementById('address').value;
                var dob = document.getElementById('dob').value;
                var gender = document.getElementById('gender').value;
                var qualification = document.getElementById('qualification').value;
                var institute = document.getElementById('institute').value;

                if (name == "") {
                    alert("Name must be filled out");
                    return false;
                }
                else if(email == "")
                {
                    alert("Email must be filled out");
                    return false;
                }
                else if(phone_no == "")
                {
                    alert("Phone number must be filled out");
                    return false;
                }
                else if(phone_no.length != 10)
                {
                    alert("Phone number is in wrong format ");
                    phone_no.focus();
                    return false;
                }
                else if(address == "")
                {
                    alert("Address must be filled out");
                    return false;
                }
                else if(dob == "")
                {
                    alert("Date of birth must be filled out");
                    return false;
                }
                
                else if(gender == "")
                {
                    alert("Gender must be filled out");
                    return false;
                }
                else if(qualification == "")
                {
                    alert("Qualification must be filled out");
                    return false;
                }
                else if(institute == "")
                {
                    alert("Institute must be filled out");
                    return false;
                }

                var database = firebase.database().ref('users');
                database.child(user.uid).child('user_details').update({
                    name: name,
                    email: email,
                    phone_no: phone_no,
                    address: address,
                    dob: dob,
                    gender: gender,
                    qualification: qualification,
                    institute: institute
                });
                alert('Details updated.');
                window.location.replace('./profile.html');
            }
        }
        // ...
    } else {
        // User is signed out.
        // ...
        window.location.replace('index.html');
    }
});
function profile() {
    window.location.replace('profile.html');
}

function request() {
    window.location.replace('request.html');
}

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.replace('index.html');
    }).catch(function (error) {
        // An error happened.
    });
}