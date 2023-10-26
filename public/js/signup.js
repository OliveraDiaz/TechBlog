

const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (username && password) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        }
        );
      const signData = await response.json();
      if(response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(signData.message);
      }
    }
}
;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.form').addEventListener('submit', signupFormHandler);
});
