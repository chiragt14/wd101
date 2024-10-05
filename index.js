document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const userTableBody = document.querySelector('#userTable tbody');
    const errorDiv = document.getElementById('error');

    // Load existing users from localStorage
    const loadUsers = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(addRowToTable);
    };

    // Add a row to the table
    const addRowToTable = (user) => {
        const row = userTableBody.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.password;
        row.insertCell(3).textContent = user.dob;
        row.insertCell(4).textContent = user.terms ? 'Yes' : 'No';
    };

    // Validate form data
    const validateForm = (name, email, dob) => {
        const today = new Date();
        const age = today.getFullYear() - new Date(dob).getFullYear();
        const isValidEmail = /\S+@\S+\.\S+/.test(email);
        if (age < 18 || age > 55) {
            errorDiv.textContent = 'Age must be between 18 and 55.';
            return false;
        }
        if (!isValidEmail) {
            errorDiv.textContent = 'Invalid email address.';
            return false;
        }
        errorDiv.textContent = '';
        return true;
    };

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        if (validateForm(name, email, dob)) {
            const user = { name, email, password, dob, terms };
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            addRowToTable(user);

            // Reset form fields
            form.reset();
        }
    });

    // Load users when the page is loaded
    loadUsers();
});

