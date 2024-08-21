// Example data: Replace this with actual data fetching logic
const skillsData = {
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
