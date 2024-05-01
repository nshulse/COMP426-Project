let username1 = document.getElementById('user_newacct');
let username2 = document.getElementById('user_retype_newacct');

let password1 = document.getElementById('pass_newacct');
let password2 = document.getElementById('user_retype_newacct');

let user_button = document.getElementById('user-edit-button');
let pass_button = document.getElementById('pass-edit-button');

user_button.addEventListener('click', () => {
    if(username1.value === username2.value){
        fetch('/account_username', {method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({username: username1.value})}).then(window.location.href = 'user_home.html');
    } else {
        alert('Usernames do not match');
    }
});

pass_button.addEventListener('click', () => {
    if(password1.value === password2.value){
        fetch('/account_password', {method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({password: password1.value})}).then(window.location.href = 'user_home.html');
    } else {
        alert('Passwords do not match');
    }
});