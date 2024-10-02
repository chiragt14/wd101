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
