// Example data: Replace this with actual data fetching logic
/*const skillsData = {
    'Wipro': ['Java', 'SQL', 'Communication Skills', 'Problem-Solving'],
    'Accenture': ['Python', 'Cloud Computing', 'Agile Methodologies', 'Team Collaboration'],
    'TCS': ['C++', 'Data Analysis', 'Project Management', 'Leadership'],
    // Add more companies and their respective skills here
};
 hix     
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
const app = express();
const path = require('path');

// Middleware to serve static files
app.use(express.static('public'));

// Route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Adjust to serve your desired page
});

// Route to serve the signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route to serve the search page
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
