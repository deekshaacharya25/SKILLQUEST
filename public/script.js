window.onload = function() {
    // Fetch companies and populate the dropdown on page load
    fetch('/api/companies')  // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            const companyDropdown = document.getElementById('companyDropdown');
            data.forEach(company => {
                const option = document.createElement('option');
                option.value = company;
                option.text = company;
                companyDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching companies:', error));
};

function findSkills() {
    // Get the value from the dropdown or the manual input field
    const selectedCompany = document.getElementById('companyDropdown').value;
    const typedCompany = document.getElementById('company').value;

    // Prioritize the dropdown value if selected, otherwise use typed company
    const company = selectedCompany || typedCompany;

    // Logic to find skills for the selected/entered company
    console.log('Searching for skills related to:', company);
    // Your existing code to fetch and display skills goes here
}



// Display skills in the UI
function displaySkills(skills) {
    const skillsSection = document.getElementById('skills-section');
    skillsSection.innerHTML = '';  // Clear previous results

    if (skills.length > 0) {
        const ul = document.createElement('ul');
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ul.appendChild(li);
        });
        skillsSection.appendChild(ul);
    } else {
        skillsSection.innerHTML = '<p>No skills found for this company.</p>';
    }
}


// Start quiz for the selected skill
async function startQuiz(skill) {
    try {
        const response = await fetch('/api/questions?skill=' + encodeURIComponent(skill));
        if (!response.ok) throw new Error('Network response was not ok');
        const questions = await response.json();
        displayQuestions(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

// Display questions in the UI
function displayQuestions(questions) {
    const questionsSection = document.getElementById('questions-section');
    questionsSection.innerHTML = ''; // Clear previous results
    if (questions.length === 0) {
        questionsSection.innerHTML = '<p>No questions found for this skill.</p>';
        return;
    }
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <p>Q${index + 1}: ${question.text}</p>
            <input type="text" id="answer-${index}" placeholder="Your answer">
        `;
        questionsSection.appendChild(questionElement);
    });
}






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

// Function to handle sign-up
function signup() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!username || !email || !password || !confirmPassword) {
        alert('All fields are required');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Send a POST request to the /api/signup endpoint
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        if (data.message === 'User created successfully') {
            alert('Sign up successful! You can now log in.');
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sign up failed. Please try again.');
    });
}
// Function to handle login
function login() {
    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            window.location.href = 'search.html';
        } else {
            alert(data.message);  // Show the error message from the server
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    });
}





