const STORAGE_USERS = 'conecta_saude_usuarios';
const STORAGE_APPOINTMENTS = 'conecta_saude_consultas';
const STORAGE_SESSION = 'conecta_saude_sessao';

async function initAppData() {
  if (!localStorage.getItem(STORAGE_USERS)) {
    try {
      const res = await fetch('json/usuarios.json');
      const usuarios = await res.json();
      localStorage.setItem(STORAGE_USERS, JSON.stringify(usuarios));
    } catch (e) {
      console.warn('Carregando fallback de usuários...');
    }
  }

  if (!localStorage.getItem(STORAGE_APPOINTMENTS)) {
    try {
      const res = await fetch('json/consultas.json');
      const consultas = await res.json();
      localStorage.setItem(STORAGE_APPOINTMENTS, JSON.stringify(consultas));
    } catch (e) {
      console.warn('Carregando fallback de consultas...');
    }
  }
}

function getStoredUsers() {
  const users = localStorage.getItem(STORAGE_USERS);
  return users ? JSON.parse(users) : [];
}

function saveStoredUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function getStoredAppointments() {
  const apps = localStorage.getItem(STORAGE_APPOINTMENTS);
  return apps ? JSON.parse(apps) : [];
}

function saveStoredAppointments(apps) {
  localStorage.setItem(STORAGE_APPOINTMENTS, JSON.stringify(apps));
}

function setCurrentUser(user) {
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(user));
}

function getCurrentUser() {
  const session = localStorage.getItem(STORAGE_SESSION);
  return session ? JSON.parse(session) : null;
}

function logoutUser() {
  localStorage.removeItem(STORAGE_SESSION);
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  initAppData();

  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .substring(0, 14);
}

function validateCPF(cpf) {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;
  return true;
}

function showAlert(elementId, message, type = 'danger') {
  const alertEl = document.getElementById(elementId);
  if (!alertEl) return;
  
  alertEl.className = `alert-message alert-${type}`;
  alertEl.textContent = message;
  alertEl.style.display = 'block';
  
  setTimeout(() => {
    alertEl.style.display = 'none';
  }, 5000);
}
