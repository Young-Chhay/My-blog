// handle login form
const loginHandler = async (event) => {
    // Stop the browser from conituosly submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
  const username = document.querySelector("#user-login").value.trim();
  const password = document.querySelector("#login-password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

  document.querySelector('.login-form').addEventListener('submit', loginHandler);