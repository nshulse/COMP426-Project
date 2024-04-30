let del_user = document.getElementById('confirm-delete');

del_user.addEventListener('click', () => {
    fetch('/account', {method: 'DELETE'}).then(window.location.href = 'index.html');
})