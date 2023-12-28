 // Function to handle form submission
 function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Verify reCAPTCHA here
    const recaptchaResponse = grecaptcha.getResponse();

    if (recaptchaResponse.length === 0) {
        alert('Please complete the reCAPTCHA.');
    } else {
        // ReCAPTCHA is verified, submit the form
        document.getElementById("login-form").submit();
    }
}

// Attach the form submission handler to the form
document.getElementById("login-form").addEventListener("submit", handleFormSubmission);