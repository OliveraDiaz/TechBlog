const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        }
        );
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.log(response);
            alert(response.statusText);

        }
        document.location.replace('/');
    }
}
;


//make sure query selector matchs
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);


