document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const userInput = document.getElementById('userInput');
  const passwordInput = document.getElementById('passwordInput');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userVal = userInput.value.trim();
      const passVal = passwordInput.value.trim();

      if (!userVal || !passVal) {
        showAlert('loginAlert', 'Por favor, preencha todos os campos.', 'danger');
        return;
      }

      const users = getStoredUsers();

      const foundUser = users.find(u => 
        (u.email.toLowerCase() === userVal.toLowerCase() || u.cpf === userVal) && u.senha === passVal
      );

      if (foundUser) {
        setCurrentUser(foundUser);
        showAlert('loginAlert', 'Login realizado com sucesso! Redirecionando...', 'success');
        
        setTimeout(() => {
          if (foundUser.tipo === 'profissional') {
            window.location.href = 'profissional.html';
          } else {
            window.location.href = 'paciente.html';
          }
        }, 1000);
      } else {
        showAlert('loginAlert', 'E-mail/CPF ou senha incorretos. Verifique suas credenciais.', 'danger');
      }
    });
  }
});
