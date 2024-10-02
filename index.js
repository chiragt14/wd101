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

    <script src="index.js"></script>
</body>
</html>
