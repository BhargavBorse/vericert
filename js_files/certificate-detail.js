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
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        
        database.child(user.uid).child('certificates').child(id).on('value',function(user_details_snapshot){
            var user_details = user_details_snapshot.val();
            
            var aimageCell = document.createElement('div');
            document.getElementsByClassName('certImage')[0].appendChild(aimageCell);
            var decrypted = CryptoJS.AES.decrypt(user_details_snapshot.child('imageURL').val(), "Secret Passphrase");
            
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
            
            
            
            
            document.getElementById('name').value = user_details.user_name;
            document.getElementById('email').value = user_details.user_email;
            document.getElementById('qualification').value = user_details.user_qualification;
            document.getElementById('title').value = user_details.title;
            document.getElementById('desc').value = user_details.description;
            document.getElementById('issuedBy').value = user_details.institute_name;
            document.getElementById('issuedDate').value = user_details.date;
        });
        
        document.getElementById('updtBtn').onclick = function(){
            
            
        }
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