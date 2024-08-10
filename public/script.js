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

// Existing code for handling the navigation menu active item

var tabsVerticalInner = $('#accordian');
var selectorVerticalInner = $('#accordian').find('li').length;
var activeItemVerticalInner = tabsVerticalInner.find('.active');
var activeWidthVerticalHeight = activeItemVerticalInner.innerHeight();
var activeWidthVerticalWidth = activeItemVerticalInner.innerWidth();
var itemPosVerticalTop = activeItemVerticalInner.position();
var itemPosVerticalLeft = activeItemVerticalInner.position();
$(".selector-active").css({
    "top": itemPosVerticalTop.top + "px",
    "left": itemPosVerticalLeft.left + "px",
    "height": activeWidthVerticalHeight + "px",
    "width": activeWidthVerticalWidth + "px"
});
$("#accordian").on("click", "li", function (e) {
    $('#accordian ul li').removeClass("active");
    $(this).addClass('active');
    var activeWidthVerticalHeight = $(this).innerHeight();
    var activeWidthVerticalWidth = $(this).innerWidth();
    var itemPosVerticalTop = $(this).position();
    var itemPosVerticalLeft = $(this).position();
    $(".selector-active").css({
        "top": itemPosVerticalTop.top + "px",
        "left": itemPosVerticalLeft.left + "px",
        "height": activeWidthVerticalHeight + "px",
        "width": activeWidthVerticalWidth + "px"
    });
});

// Add active class-on another-page move
jQuery(document).ready(function ($) {
    var path = window.location.pathname.split("/").pop();
    if (path == '') {
        path = 'index.html';
    }
    var target = $('#accordian ul li a[href="' + path + '"]');
    target.parent().addClass('active');
});

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
