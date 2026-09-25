document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.getElementById('cadastroForm');
  const cpfInput = document.getElementById('cpf');

  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      e.target.value = maskCPF(e.target.value);
    });
  }

  if (cadastroForm) {
    cadastroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const cpf = document.getElementById('cpf').value.trim();
      const senha = document.getElementById('senha').value.trim();
      const confirmSenha = document.getElementById('confirmSenha').value.trim();
      const tipo = document.getElementById('tipo').value;

      if (!nome || !email || !cpf || !senha || !confirmSenha || !tipo) {
        showAlert('cadastroAlert', 'Todos os campos são de preenchimento obrigatório.', 'danger');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        showAlert('cadastroAlert', 'Por favor, insira um endereço de e-mail válido.', 'danger');
        return;
      }

      if (!validateCPF(cpf)) {
        showAlert('cadastroAlert', 'CPF inválido. Certifique-se de digitar 11 dígitos.', 'danger');
        return;
      }

      if (senha.length < 6) {
        showAlert('cadastroAlert', 'A senha deve possuir pelo menos 6 caracteres.', 'danger');
        return;
      }

      if (senha !== confirmSenha) {
        showAlert('cadastroAlert', 'As senhas informadas não coincidem.', 'danger');
        return;
      }

      const users = getStoredUsers();

      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase() || u.cpf === cpf);
      if (userExists) {
        showAlert('cadastroAlert', 'Já existe um cadastro registrado com este E-mail ou CPF.', 'danger');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        nome,
        email,
        cpf,
        senha,
        tipo,
        avatar: tipo === 'profissional'
          ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
      };

      users.push(newUser);
      saveStoredUsers(users);

      showAlert('cadastroAlert', 'Cadastro realizado com sucesso! Redirecionando para o login...', 'success');

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    });
  }
});
