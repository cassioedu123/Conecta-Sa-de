document.addEventListener('DOMContentLoaded', () => {
  const step1Form = document.getElementById('recoverStep1');
  const step2Form = document.getElementById('recoverStep2');
  let targetUser = null;

  if (step1Form) {
    step1Form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailVal = document.getElementById('recoverEmail').value.trim();
      if (!emailVal) {
        showAlert('recoverAlert', 'Por favor, informe seu e-mail cadastrado.', 'danger');
        return;
      }

      const users = getStoredUsers();
      targetUser = users.find(u => u.email.toLowerCase() === emailVal.toLowerCase());

      if (targetUser) {
        showAlert('recoverAlert', 'E-mail localizado! Insira sua nova senha abaixo.', 'success');
        step1Form.style.display = 'none';
        step2Form.style.display = 'block';
      } else {
        showAlert('recoverAlert', 'Nenhum usuário cadastrado foi encontrado com este e-mail.', 'danger');
      }
    });
  }

  if (step2Form) {
    step2Form.addEventListener('submit', (e) => {
      e.preventDefault();

      const newPass = document.getElementById('newPassword').value.trim();
      const confirmPass = document.getElementById('confirmNewPassword').value.trim();

      if (!newPass || !confirmPass) {
        showAlert('recoverAlert', 'Preencha a nova senha e a confirmação.', 'danger');
        return;
      }

      if (newPass.length < 6) {
        showAlert('recoverAlert', 'A senha deve conter no mínimo 6 caracteres.', 'danger');
        return;
      }

      if (newPass !== confirmPass) {
        showAlert('recoverAlert', 'As senhas não coincidem.', 'danger');
        return;
      }

      const users = getStoredUsers();
      const index = users.findIndex(u => u.id === targetUser.id);
      if (index !== -1) {
        users[index].senha = newPass;
        saveStoredUsers(users);

        showAlert('recoverAlert', 'Senha alterada com sucesso! Redirecionando para o login...', 'success');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      }
    });
  }
});
