// Selecting necessary elements
const constraints = document.querySelector('.options-container');
const output = document.querySelector('.password');
const copyBtn = document.querySelector('.copy-btn');
const includeUppercaseInput = document.getElementById('uppercase');
const includeLowercaseInput = document.getElementById('lowercase');
const includeNumbersInput = document.getElementById('numbers');
const includeSymbolsInput = document.getElementById('symbols');
const characterLengthInput = document.getElementById('inputRange');
const lengthDisplay = document.querySelector('.length');
const generateBtn = document.querySelector('.generate-btn');
const strengthLabel = document.querySelector('.strength-label');
const strengthLevel = document.querySelector('.strength-level');
const strengthBars = document.querySelectorAll('.strength-bar');
const inputRange = document.getElementById("inputRange");
const activeColor = "#a4ffaf";
const inactiveColor = "#000000";

inputRange.addEventListener("input", function() {
  const ratio = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
});

// Enable the password input field
output.disabled = false;

// Update the character length display
characterLengthInput.addEventListener('input', () => {
    lengthDisplay.textContent = characterLengthInput.value;
});

// Function to generate password
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const characterLength = characterLengthInput.value;
    const includeUppercase = includeUppercaseInput.checked;
    const includeLowercase = includeLowercaseInput.checked;
    const includeNumbers = includeNumbersInput.checked;
    const includeSymbols = includeSymbolsInput.checked;

    let password = '';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-={}:<>?';

    let characters = '';
    if (includeUppercase) characters += uppercaseLetters;
    if (includeLowercase) characters += lowercaseLetters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (characters.length === 0) {
        alert('Please select at least one character type.');
        strengthLabel.styles.display = none
        return;
    }

    for (let i = 0; i < characterLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    output.value = password;
    updateStrengthIndicator(password);
});

// Function to copy password to clipboard
copyBtn.addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
});

// Function to update strength indicator
function updateStrengthIndicator(password) {
    let strength = 0;
    const strengthCriteria = [
        /[A-Z]/, // Uppercase letters
        /[a-z]/, // Lowercase letters
        /[0-9]/, // Numbers
        /[^A-Za-z0-9]/ // Symbols
    ];

    strengthCriteria.forEach(criteria => {
        if (criteria.test(password)) {
            strength++;
        }
    });

    // Clear all strength bars
    strengthBars.forEach(bar => bar.classList.remove('filled'));

    // Fill strength bars based on strength
    for (let i = 0; i < strength; i++) {
        strengthBars[i].classList.add('filled');
    }

    // Update strength label
    let strengthText;
    switch (strength) {
        case 1:
            strengthText = 'TOO WEAK!';
            break;
        case 2:
            strengthText = 'WEAK';
            break;
        case 3:
            strengthText = 'MEDIUM';
            break;
        case 4:
            strengthText = 'STRONG';
            break;
        default:
            strengthText = 'TOO WEAK!';
            break;
    }
    strengthLevel.textContent = strengthText;
}
