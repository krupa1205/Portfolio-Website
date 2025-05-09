// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.innerHTML = currentTheme === 'dark' ?
  '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' ?
    '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Form Submission (only show message)
document.addEventListener('DOMContentLoaded', () => {
  const projectForm = document.getElementById('projectForm');

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const projectName = document.getElementById('projectName').value.trim();
      const projectType = document.getElementById('projectType').value.trim();
      const projectDesc = document.getElementById('projectDesc').value.trim();

      if (!projectName || !projectType || !projectDesc) {
        showMessage('Please fill in all required fields', 'error');
        return;
      }

      // Just show success message (no fetch)
      showMessage('Your project submitted successfully!', 'success');
      projectForm.reset(); // Optional: clear form after success
    });
  }
});

// Show animated message
function showMessage(text, type = 'success') {
  const existing = document.querySelector('.status-message');
  if (existing) existing.remove();

  const message = document.createElement('div');
  message.className = `status-message ${type}`;
  message.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    ${text}
  `;
  document.body.appendChild(message);

  setTimeout(() => {
    message.style.opacity = '0';
    setTimeout(() => message.remove(), 300);
  }, 3000);
}

// Styles for animated message
const messageStyle = document.createElement('style');
messageStyle.textContent = `
  .status-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 30px;
    border-radius: 50px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeInOut 3s ease forwards;
    background: linear-gradient(90deg, #6c63ff, #ff6b6b);
    color: white;
    opacity: 1;
  }

  .status-message.error {
    background: linear-gradient(90deg, #ff416c, #ff4b2b);
  }

  @keyframes fadeInOut {
    0% { opacity: 0; top: 10px; }
    10% { opacity: 1; top: 20px; }
    90% { opacity: 1; top: 20px; }
    100% { opacity: 0; top: 10px; }
  }
`;
document.head.appendChild(messageStyle);
