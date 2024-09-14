document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const dobInput = document.getElementById('dob').value;
    const dob = new Date(dobInput);
    const today = new Date();
    
    const age = today.getFullYear() - dob.getFullYear();
    const ageDiff = today.setFullYear(1970) - dob.setFullYear(1970); // Accounts for leap years
    
    if (age < 18 || age > 55) {
        alert('Date of birth must be between 18 and 55 years old.');
        return;
    }

    // Continue with form submission logic here (e.g., saving data, updating the table)
});
// Saving form data to localStorage
function saveData(name, email, password, dob, terms) {
    const formData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        terms: terms
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Loading form data from localStorage
function loadData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('name').value = formData.name;
        document.getElementById('email').value = formData.email;
        document.getElementById('password').value = formData.password;
        document.getElementById('dob').value = formData.dob;
        document.getElementById('terms').checked = formData.terms;
    }
}

// On page load, call loadData to populate the form
window.onload = loadData;


function updateTable(name, email, password, dob, terms) {
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = email;
    newRow.insertCell(2).textContent = password;
    newRow.insertCell(3).textContent = dob;
    newRow.insertCell(4).textContent = terms ? 'Yes' : 'No';
}

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;
    
    updateTable(name, email, password, dob, terms);
    saveData(name, email, password, dob, terms);
});
