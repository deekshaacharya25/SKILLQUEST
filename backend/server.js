// Example data: Replace this with actual data fetching logic
/*const skillsData = {
    'Wipro': ['Java', 'SQL', 'Communication Skills', 'Problem-Solving'],
    'Accenture': ['Python', 'Cloud Computing', 'Agile Methodologies', 'Team Collaboration'],
    'TCS': ['C++', 'Data Analysis', 'Project Management', 'Leadership'],
    // Add more companies and their respective skills here
};

function findSkills() {
    const company = document.getElementById('company').value.trim();
    const navbar = document.getElementById('navbar');

    // Clear previous results
    navbar.innerHTML = '<div class="selector-active"><div class="top"></div><div class="bottom"></div></div>';

    if (company && skillsData[company]) {
        // Display the skills in the navigation menu
        skillsData[company].forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.innerHTML = `<a href="javascript:void(0);"><i class="far fa-dot-circle"></i>${skill}</a>`;
            navbar.appendChild(skillItem);
        });

        // Adjust the selector-active position
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
const express = require('express');
const path = require('path');
const fs = require('fs').promises; // Use promises for async file operations
const bcrypt = require('bcrypt'); // For password hashing
const app = express();
const port = 3000;

const companies = require('./data/companies.json');
const usersFile = path.join(__dirname, 'data', 'users.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

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

// Endpoint to handle user sign-up
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const data = await fs.readFile(usersFile, 'utf8');
        let users = JSON.parse(data);

        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({ username, email, password: hashedPassword });

        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

        res.json({ message: 'User created successfully.' });
    } catch (err) {
        console.error('Error handling signup:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
