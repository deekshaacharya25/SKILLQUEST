const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const companies = require('./data/companies.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));  // Serve static files from the public directory

// Endpoint to get skills based on company name
app.get('/api/skills', (req, res) => {
    const companyName = req.query.company.toLowerCase();
    const company = companies.find(c => c.name.toLowerCase() === companyName);

    if (company) {
        res.json({ skills: company.skills.map(skill => skill.name) });
    } else {
        res.json({ skills: [] });
    }
});

// Endpoint to get questions based on company name and skill
app.get('/api/questions', (req, res) => {
    const companyName = req.query.company.toLowerCase();
    const skillName = req.query.skill.toLowerCase();
    const company = companies.find(c => c.name.toLowerCase() === companyName);

    if (company) {
        const skill = company.skills.find(s => s.name.toLowerCase() === skillName);
        if (skill) {
            res.json({ questions: skill.questions });
        } else {
            res.json({ questions: [] });
        }
    } else {
        res.json({ questions: [] });
    }
});

app.use(express.static(path.join(__dirname, '..', 'public')));
// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'login.html'));
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
