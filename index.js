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
}
