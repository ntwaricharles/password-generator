document.addEventListener('DOMContentLoaded', () => {
    // Selecting necessary elements
    const output = document.querySelector('.password');
    const copyBtn = document.querySelector('.copy-btn');
    const copiedText = document.createElement('span');
    copiedText.textContent = 'copied';
    copiedText.classList.add('copied');
    copyBtn.insertAdjacentElement('beforebegin', copiedText);
    
    const includeUppercaseInput = document.getElementById('uppercase');
    const includeLowercaseInput = document.getElementById('lowercase');
    const includeNumbersInput = document.getElementById('numbers');
    const includeSymbolsInput = document.getElementById('symbols');
    const characterLengthInput = document.getElementById('inputRange');
    const lengthDisplay = document.querySelector('.length');
    const generateBtn = document.querySelector('.generate-btn');
    const strengthLevel = document.querySelector('.strength-level');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const inputRange = document.getElementById("inputRange");
    const activeColor = "#a4ffaf";
    const inactiveColor = "#000000";

    // Update range input background and character length display
    inputRange.addEventListener("input", () => {
        const { value, min, max } = inputRange;
        const ratio = (value - min) / (max - min) * 100;
        inputRange.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
        lengthDisplay.textContent = value;
    });

    // Enable the password input field
    output.disabled = false;

    // Password generator function
    const generatePassword = (length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) => {
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
            return '';
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return password;
    };

    // Update strength indicator function
    const updateStrengthIndicator = (password) => {
        const strengthCriteria = [
            /[A-Z]/, // Uppercase letters
            /[a-z]/, // Lowercase letters
            /[0-9]/, // Numbers
            /[^A-Za-z0-9]/ // Symbols
        ];

        let strength = 0;
        strengthCriteria.forEach(criteria => {
            if (criteria.test(password)) strength++;
        });

        // Clear all strength bars
        strengthBars.forEach(bar => {
            bar.classList.remove('filled');
            bar.style.backgroundColor = ''; // Reset background color
        });

        // Fill strength bars based on strength and update color
        for (let i = 0; i < strength; i++) {
            strengthBars[i].classList.add('filled');
            switch (strength) {
                case 1:
                    strengthBars[i].style.backgroundColor = '#F64A4A';
                    break;
                case 2:
                    strengthBars[i].style.backgroundColor = '#FB7C58';
                    break;
                case 3:
                    strengthBars[i].style.backgroundColor = '#F8CD65';
                    break;
                case 4:
                    strengthBars[i].style.backgroundColor = '#A4FFAF';
                    break;
                default:
                    break;
            }
        }

        // Update strength label
        const strengthText = ['TOO WEAK!', 'WEAK', 'MEDIUM', 'STRONG'][strength - 1] || 'TOO WEAK!';
        strengthLevel.textContent = strengthText;
    };

    // Event listener for generate button
    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const length = characterLengthInput.value;
        const includeUppercase = includeUppercaseInput.checked;
        const includeLowercase = includeLowercaseInput.checked;
        const includeNumbers = includeNumbersInput.checked;
        const includeSymbols = includeSymbolsInput.checked;

        const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        if (password) {
            output.value = password;
            updateStrengthIndicator(password);
        }
    });

    // Event listener for copy button
    copyBtn.addEventListener('click', () => {
        output.select();
        document.execCommand('copy');
        copiedText.classList.add('show');
        setTimeout(() => {
            copiedText.classList.remove('show');
        }, 1000);
    });
});
