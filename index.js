document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const userTableBody = document.getElementById('userTableBody');
    const errorMessage = document.getElementById('errorMessage');

    // Load existing users from localStorage
    loadUsers();

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Validate email
        if (!validateEmail(email)) {
            errorMessage.textContent = "Please enter a valid email address.";
            return;
        }

        // Validate age
        if (!validateAge(dob)) {
            errorMessage.textContent = "You must be between 18 and 55 years old.";
            return;
        }

        // Clear error message
        errorMessage.textContent = "";

        // Create user object
        const user = {
            name,
            email,
            password,
            dob,
            termsAccepted
        };

        // Save to localStorage
        saveUser(user);

        // Reset form
        registrationForm.reset();
        
        // Load users to display in the table
        loadUsers();
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateAge(dob) {
        const birthDate = new Date(dob);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const monthDiff = new Date().getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18 && age <= 55;
    }

    function saveUser(user) {
        const users = getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    function loadUsers() {
        const users = getUsers();
        userTableBody.innerHTML = "";
        users.forEach(user => {
            const row = `<tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.password}</td>
                            <td>${user.dob}</td>
                            <td>${user.termsAccepted ? 'Yes' : 'No'}</td>
                        </tr>`;
            userTableBody.innerHTML += row;
        });
    }
});

