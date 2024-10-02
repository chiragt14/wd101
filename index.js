<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

    <h1>Registration Form</h1>
    <form id="registrationForm">
        <label for="name">Name:</label>
        <input type="text" id="name" required><br><br>
        
        <label for="email">Email:</label>
        <input type="email" id="email" required><br><br>
        
        <label for="password">Password:</label>
        <input type="password" id="password" required><br><br>
        
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" required><br><br>
        
        <label>
            <input type="checkbox" id="terms" required>
            Accept Terms?
        </label><br><br>
        
        <button type="submit">Submit</button>
    </form>

    <table id="registrationTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Dob</th>
                <th>Accepted terms?</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

    <script>
        const registrationForm = document.getElementById('registrationForm');
        const registrationTable = document.getElementById('registrationTable').getElementsByTagName('tbody')[0];

        // Load existing entries from localStorage
        window.onload = () => {
            const entries = JSON.parse(localStorage.getItem('registrationEntries')) || [];
            entries.forEach(entry => addRow(entry));
        };

        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const dob = document.getElementById('dob').value;
            const termsAccepted = document.getElementById('terms').checked;

            const age = calculateAge(new Date(dob));
            if (age < 18 || age > 55) {
                alert('You must be between 18 and 55 years old.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const entry = { name, email, password, dob, termsAccepted };
            addRow(entry);

            // Save entries to localStorage
            const existingEntries = JSON.parse(localStorage.getItem('registrationEntries')) || [];
            existingEntries.push(entry);
            localStorage.setItem('registrationEntries', JSON.stringify(existingEntries));

            // Reset the form
            registrationForm.reset();
        });

        function addRow(entry) {
            const newRow = registrationTable.insertRow();
            newRow.insertCell(0).innerText = entry.name;
            newRow.insertCell(1).innerText = entry.email;
            newRow.insertCell(2).innerText = entry.password;
            newRow.insertCell(3).innerText = entry.dob;
            newRow.insertCell(4).innerText = entry.termsAccepted ? 'Yes' : 'No';
        }

        function calculateAge(dob) {
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            return age;
        }
    </script>

</body>
</html>

document.addEventListener('DOMContentLoaded', loadEntries);

const form = document.getElementById('registrationForm');
const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validate email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate age
    const age = calculateAge(new Date(dob));
    if (age < 18 || age > 55) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    // Create a new row in the table
    const newRow = usersTable.insertRow();
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = email;
    newRow.insertCell(2).textContent = password;
    newRow.insertCell(3).textContent = dob;
    newRow.insertCell(4).textContent = termsAccepted ? 'Yes' : 'No';

    // Save entry to localStorage
    saveEntry({ name, email, password, dob, termsAccepted });
    form.reset();
});

function calculateAge(dob) {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(entry => {
        const newRow = usersTable.insertRow();
        newRow.insertCell(0).textContent = entry.name;
        newRow.insertCell(1).textContent = entry.email;
        newRow.insertCell(2).textContent = entry.password;
        newRow.insertCell(3).textContent = entry.dob;
        newRow.insertCell(4).textContent = entry.termsAccepted ? 'Yes' : 'No';
    });
}
