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




/*
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



const skillsData = {
    'Wipro': ['Java', 'SQL', 'Communication Skills', 'Problem-Solving'],
    'Accenture': ['Python', 'Cloud Computing', 'Agile Methodologies', 'Team Collaboration'],
    'TCS': ['C++', 'Data Analysis', 'Project Management', 'Leadership'],
};

function findSkills() {
    const company = document.getElementById('company').value.trim();
    const navbar = document.getElementById('navbar');

    navbar.innerHTML = '<div class="selector-active"><div class="top"></div><div class="bottom"></div></div>';

    if (company && skillsData[company]) {
        skillsData[company].forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.innerHTML = `<a href="javascript:void(0);"><i class="far fa-dot-circle"></i>${skill}</a>`;
            navbar.appendChild(skillItem);
        });

        const firstSkillItem = navbar.querySelector('li');
        if (firstSkillItem) {
            firstSkillItem.classList.add('active');
            var activeWidthVerticalHeight = firstSkillItem.innerHeight;
            var activeWidthVerticalWidth = firstSkillItem.innerWidth;
            var itemPosVerticalTop = firstSkillItem.position();
            var itemPosVerticalLeft = firstSkillItem.position();
            $(".selector-active").css({
                "top": itemPosVerticalTop.top + "px",
                "left": itemPosVerticalLeft.left + "px",
                "height": activeWidthVerticalHeight + "px",
                "width": activeWidthVerticalWidth + "px"
            });
        }
    } else {
        alert('No skills found for the entered company.');
    }

}





const skillsData = {
    'Wipro': ['Java', 'SQL', 'Communication Skills', 'Problem-Solving'],
    'Accenture': ['Python', 'Cloud Computing', 'Agile Methodologies', 'Team Collaboration'],
    'TCS': ['C++', 'Data Analysis', 'Project Management', 'Leadership'],
};

// Function to handle login
function login() {
    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    if (email === '' || password === '') {
        alert('Please enter both email and password.');
        return;
    }

    // Simple validation (for demonstration purposes)
    if (email === 'user@example.com' && password === 'password') {
        // Redirect to search.html on successful login
        window.location.href = 'search.html';
    } else {
        alert('Invalid email or password.');
    }
}

function findSkills() {
    const company = document.getElementById('company').value.trim();
    const navbar = document.getElementById('navbar');

    navbar.innerHTML = '<div class="selector-active"><div class="top"></div><div class="bottom"></div></div>';

    if (company && skillsData[company]) {
        skillsData[company].forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.innerHTML = `<a href="javascript:void(0);"><i class="far fa-dot-circle"></i>${skill}</a>`;
            navbar.appendChild(skillItem);
        });

        const firstSkillItem = navbar.querySelector('li');
        if (firstSkillItem) {
            firstSkillItem.classList.add('active');
            var activeWidthVerticalHeight = firstSkillItem.innerHeight;
            var activeWidthVerticalWidth = firstSkillItem.innerWidth;
            var itemPosVerticalTop = firstSkillItem.position();
            var itemPosVerticalLeft = firstSkillItem.position();
            $(".selector-active").css({
                "top": itemPosVerticalTop.top + "px",
                "left": itemPosVerticalLeft.left + "px",
                "height": activeWidthVerticalHeight + "px",
                "width": activeWidthVerticalWidth + "px"
            });
        }
    } else {
        alert('No skills found for the entered company.');
    }
}

*/



// Handle the login functionality
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            window.location.href = 'search.html';
        } else {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Handle the signup functionality
function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'User created successfully') {
            window.location.href = 'login.html';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Handle the search functionality
function search() {
    const companyName = document.getElementById('companyName').value;
    const skillName = document.getElementById('skillName').value;

    if (!companyName || !skillName) {
        alert('Please enter both company name and skill name.');
        return;
    }

    fetch(`/api/questions?company=${encodeURIComponent(companyName)}&skill=${encodeURIComponent(skillName)}`)
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.questions.length > 0) {
            resultDiv.innerHTML = `<h2>Questions:</h2><ul>${data.questions.map(q => `<li>${q}</li>`).join('')}</ul>`;
        } else {
            resultDiv.innerHTML = '<p>No questions found for the selected company and skill.</p>';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
