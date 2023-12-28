const generateRandomPassword = ()=>{
    const length = 10; // Adjust the length as needed
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?"; // Characters to include in the password
    let password = "";

    // Function to get a random character from the charset
    const getRandomChar = () => {
        const randomIndex = Math.floor(Math.random() * charset.length);
        return charset[randomIndex];
    };

    // Ensure at least one lowercase letter
    password += getRandomChar();

    // Ensure at least one uppercase letter
    password += getRandomChar().toUpperCase();

    // Ensure at least one number
    password += Math.floor(Math.random() * 10);

    // Fill the remaining characters
    for (let i = 0; i < length - 3; i++) {
        password += getRandomChar();
    }

    // Shuffle the characters to make it more random
    password = password.split("");
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join("");
}

module.exports = generateRandomPassword;