wd101
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Here, you can add any validation or processing logic

    // For demonstration, we'll just show a success message
    document.getElementById('message').innerText = `Registration successful for ${username}!`;

    // Optionally, clear the form fields
    this.reset();
});
