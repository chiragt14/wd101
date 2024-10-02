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

        
