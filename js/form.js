const form = document.getElementById('contact-form');
const passField = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-password');

// Password Toggle
toggleBtn.onclick = () => {
    const isPass = passField.type === 'password';
    passField.type = isPass ? 'text' : 'password';
    toggleBtn.textContent = isPass ? '🙈' : '👁️';
};

// Validation + Regex
form.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email) {
        alert("All fields are required!");
        return;
    }

    if (!regex.test(email)) {
        alert("Invalid email format!");
        return;
    }

    alert("Thank you for registering!");
    form.reset();
};