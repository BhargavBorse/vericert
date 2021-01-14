var uid;

var database = firebase.database().ref('users');
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
        pullDets();
        // ...
    } else {
        // User is signed out.
        // ...
        window.location.replace('index.html');
    }
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        document.getElementById('subBtn').onclick = function(){
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
                alert('Details saved successfully');
                window.location.replace('./main.html');
            }
        }
    }
    else {
        // User is signed out.
        // ...
        alert('error');
        window.location.replace('./index.html');
    }
});