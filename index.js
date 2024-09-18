document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Here you can handle the registration logic (e.g., send data to server)
    console.log(`Username: ${username}, Email: ${email}`);

    alert('Registration successful!');
});
