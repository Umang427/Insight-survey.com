// Initialize EmailJS with your public key
emailjs.init("CUIp5b4nQ7IK81p53");  // Replace with your actual public key

// Get elements
const loginButton = document.getElementById('loginButton');
const userLoginButton = document.querySelector("button");  // This is the "user login" button
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const normalWebsiteSection = document.getElementById('normalWebsiteSection');
const surveyForm = document.getElementById('surveyForm');

// User Login button functionality (fail login scenario)
userLoginButton.addEventListener("click", function() {
  // Hide the login section and show the normal website section (no dashboard access)
  loginSection.style.display = 'none';
  dashboardSection.style.display = 'none';  // Ensure dashboard remains hidden
  normalWebsiteSection.style.display = 'block';  // Show normal website content
});

// Admin Login button functionality
loginButton.addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Add your actual login logic here (e.g., check username and password)
  if (username === 'Umang' && password === '123654') {
    // Successful login: show the dashboard and hide login
    loginSection.style.display = 'none';
    normalWebsiteSection.style.display = 'none';
    dashboardSection.style.display = 'block';
  } else {
    // Failed login: show normal website without dashboard
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'none';
    normalWebsiteSection.style.display = 'block';
  }
});

// Handle the survey form submission
surveyForm.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent default form submission behavior

  // Collect form data
  const formData = new FormData(surveyForm);

  // Validate age and mobile number
  const age = formData.get('age');
  const mobileNumber = formData.get('mobile');

  if (!age || isNaN(age) || age < 1 || age > 100) {
    alert('Please enter a valid age between 1 and 100.');
    return;
  }

  if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber)) {
    alert('Please enter a valid 10-digit mobile number.');
    return;
  }

  // Example: You can print the form data to the console for now
  formData.forEach((value, key) => {
    console.log(key + ': ' + value);
  });

  // Send form data via email using EmailJS
  emailjs.sendForm('service_0cq9fcs', 'template_c8n3wpr', surveyForm)
    .then(function(response) {
      alert('Survey submitted successfully!');
    }, function(error) {
      alert('Error submitting survey. Please try again.');
    });

  // Optionally, reset the form after submission
  surveyForm.reset();
});
