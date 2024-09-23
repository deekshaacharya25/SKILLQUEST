const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const usersFile = path.join(__dirname, 'data', 'users.json');
const companiesFile = path.join(__dirname, 'data', 'companies.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to get the list of companies for the dropdown
// Endpoint to get the list of companies
app.get('/api/companies', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'companies.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading companies file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let companies;
        try {
            companies = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing companies JSON:', parseErr);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }

        // Assuming companies is an array in companies.json
        res.json(companies);
    });
});


// Endpoint to get skills based on company name
app.get('/api/skills', (req, res) => {
    const companyName = req.query.company;

    if (!companyName) {
        return res.status(400).json({ error: 'Company name is required' });
    }

    // Load data from JSON file
    fs.readFile(companiesFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let skillsData;
        try {
            skillsData = JSON.parse(data);  // Ensure the JSON is valid
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }

        // Find skills for the company
        const skills = skillsData[companyName];

        if (!skills) {
            return res.status(404).json({ error: 'Company not found or no skills available' });
        }

        res.json(skills);  // Return the found skills
    });
});

// Endpoint to get questions based on the skill
app.get('/api/questions', (req, res) => {
    const skill = req.query.skill;
    if (skill) {
        const questionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json')));
        const questions = questionsData[skill] || [];
        res.json(questions);
    } else {
        res.status(400).send('Skill is required');
    }
});

// Endpoint to handle user sign-up
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    fs.readFile(usersFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.status(500).json({ message: 'Unable to read users file' });
        }

        let users = [];
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing users file:', parseError);
            return res.status(500).json({ message: 'Error parsing users file' });
        }

        const userExists = users.find(user => user.email === email);

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        users.push({ username, email, password });

        fs.writeFile(usersFile, JSON.stringify(users, null, 2), err => {
            if (err) {
                console.error('Error writing users file:', err);
                return res.status(500).json({ message: 'Unable to save user' });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
});

// Endpoint to handle user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', { email, password });  // Debugging line

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    fs.readFile(usersFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.status(500).json({ message: 'Unable to read users file' });
        }

        let users = [];
        try {
            users = JSON.parse(data);
            console.log('Users data:', users);  // Debugging line
        } catch (parseError) {
            console.error('Error parsing users file:', parseError);
            return res.status(500).json({ message: 'Error parsing users file' });
        }

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
