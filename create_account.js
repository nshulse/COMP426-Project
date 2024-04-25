export class CreateAccount {
    render(render_div){
        let create_button = document.getElementById('create-button');
        console.log(create_button.innerText)

        create_button.addEventListener('click', () => {
            let user = document.getElementById('username_newacct').value;
            let pass = document.getElementById('pass_newacct').value;
            let pass_retyped = document.getElementById('pass_retype_newacct').value;
            console.log(user + ' ' + pass + ' ' + pass_retyped);
            // TODO: Check to see if username already in database and
            // creates new acount if username not already in databse and
            // password and retyped password are the same
        });
    }
}