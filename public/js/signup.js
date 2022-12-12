// handle Signup form
const signUpHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#signup-username');
    const userPassword = document.querySelector('#signup-password');
  
    if (userName && userPassword) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username: userName.value, password: userPassword.value }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Signup failed');
      }
    }
  };
  
document.querySelector('#signup-form').addEventListener('submit', signUpHandler);