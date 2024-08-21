/*let currentQuestions = [];
let currentAnswers = [];
function login() {
    // Perform your login validation here

    // If login is successful, redirect to the search page
    window.location.href = 'search.html';
}

function findSkills() {
    const company = document.getElementById('company').value;
    // Your logic to find and display skills
    document.getElementById('skills-section').style.display = 'block';
}

 
function findSkills() {
    const companyInput = document.getElementById('company').value.toLowerCase();
    fetch(`/api/skills?company=${companyInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.skills.length > 0) {
                renderSkills(data.skills);
            } else {
                alert('Company not found. Please try again.');
            }
        });
}

function renderSkills(skills) {
    const skillsSection = document.getElementById('skills-section');
    const skillsContainer = document.getElementById('skills-container');

    skillsContainer.innerHTML = '';

    skills.forEach(skill => {
        const skillButton = document.createElement('button');
        skillButton.className = 'skills-button';
        skillButton.textContent = skill;
        skillButton.onclick = () => fetchQuestions(skill);
        skillsContainer.appendChild(skillButton);
    });

    document.getElementById('search').style.display = 'none';
    skillsSection.style.display = 'block';
}

function fetchQuestions(skill) {
    const companyInput = document.getElementById('company').value.toLowerCase();
    fetch(`/api/questions?company=${companyInput}&skill=${skill.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
            currentQuestions = data.questions;
            renderQuestions(skill);
        });
}

function renderQuestions(skill) {
    const skillsSection = document.getElementById('skills-section');
    const skillsContainer = document.getElementById('skills-container');

    skillsContainer.innerHTML = `<h3>${skill}</h3>`;
    
    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        
        q.options.forEach((option, i) => {
            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `<input type="radio" name="question${index}" value="${option}">${option}`;
            questionDiv.appendChild(optionLabel);
        });
        
        skillsContainer.appendChild(questionDiv);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.onclick = calculateScore;
    skillsContainer.appendChild(submitButton);
}

function calculateScore() {
    let score = 0;
    
    currentQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    displayScoreboard(score);
}

function displayScoreboard(score) {
    const skillsSection = document.getElementById('skills-section');
    const skillsContainer = document.getElementById('skills-container');

    skillsContainer.innerHTML = `<h3>Your Score: ${score} / ${currentQuestions.length}</h3>`;

    if (score / currentQuestions.length >= 0.75) {
        skillsContainer.innerHTML += `<p>Congratulations! You are eligible for this company.</p>`;
    } else {
        skillsContainer.innerHTML += `<p>Sorry, you are not eligible for this company.</p>`;
    }

    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.onclick = () => location.reload();
    skillsContainer.appendChild(goBackButton);
}
*/
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
