document.addEventListener('DOMContentLoaded', () => {
  let currentUser = getCurrentUser();
  
  if (!currentUser || currentUser.tipo !== 'paciente') {
    const users = getStoredUsers();
    currentUser = users.find(u => u.tipo === 'paciente') || {
      id: "1",
      nome: "João da Silva",
      email: "joao@email.com",
      tipo: "paciente"
    };
  }

  const welcomeText = document.getElementById('patientWelcomeName');
  if (welcomeText) {
    welcomeText.textContent = currentUser.nome;
  }

  renderAppointments(currentUser.id);

  const openScheduleBtn = document.getElementById('openScheduleModalBtn');
  const closeScheduleBtn = document.getElementById('closeScheduleModalBtn');
  const modal = document.getElementById('scheduleModal');
  const scheduleForm = document.getElementById('scheduleForm');

  if (openScheduleBtn && modal) {
    openScheduleBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  if (closeScheduleBtn && modal) {
    closeScheduleBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (scheduleForm) {
    scheduleForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const medicoSelect = document.getElementById('selectMedico');
      const dataVal = document.getElementById('inputData').value;
      const horarioVal = document.getElementById('inputHorario').value;
      const motivoVal = document.getElementById('inputMotivo').value.trim();

      if (!medicoSelect.value || !dataVal || !horarioVal) {
        showAlert('modalAlert', 'Por favor, preencha a data, horário e médico.', 'danger');
        return;
      }

      const medicoNome = medicoSelect.options[medicoSelect.selectedIndex].text;
      const especialidade = medicoSelect.options[medicoSelect.selectedIndex].getAttribute('data-esp') || 'Clínico Geral';

      const dateParts = dataVal.split('-');
      const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const dataFormatada = `${parseInt(dateParts[2])} ${meses[parseInt(dateParts[1]) - 1]}`;

      const newApp = {
        id: 'c_' + Date.now(),
        pacienteId: currentUser.id,
        pacienteNome: currentUser.nome,
        profissionalId: medicoSelect.value,
        medicoNome: medicoNome,
        especialidade: especialidade,
        data: dataVal,
        dataFormatada: dataFormatada,
        horario: horarioVal,
        tipo: 'Consulta',
        motivo: motivoVal || 'Atendimento agendado pelo sistema',
        status: 'Aguardando confirmação'
      };

      const apps = getStoredAppointments();
      apps.push(newApp);
      saveStoredAppointments(apps);

      modal.classList.remove('active');
      scheduleForm.reset();

      renderAppointments(currentUser.id);
    });
  }
});

function renderAppointments(patientId) {
  const container = document.getElementById('patientAppointmentsContainer');
  if (!container) return;

  const allApps = getStoredAppointments();
  const patientApps = allApps.filter(a => a.pacienteId === patientId || a.pacienteNome === "João da Silva");

  if (patientApps.length === 0) {
    container.innerHTML = `<p style="color: #777; padding: 1rem 0;">Você não possui consultas agendadas no momento.</p>`;
    return;
  }

  container.innerHTML = patientApps.map(app => {
    const isTeal = app.status === 'Confirmado' || app.status === 'Confirmada';
    const statusClass = isTeal ? 'status-teal' : 'status-orange';

    return `
      <div class="appointment-item">
        <div class="date-badge">
          <div class="date-day">${app.dataFormatada.split(' ')[0]}</div>
          <div class="date-month">${app.dataFormatada.split(' ')[1] || ''}</div>
          <div class="date-time">${app.horario}</div>
        </div>
        <div style="width: 42px; height: 42px; border-radius: 50%; background-color: #d1eeec; color: #0d8a80; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        <div class="appointment-doc-info">
          <h4>${app.medicoNome}</h4>
          <p>${app.especialidade}</p>
        </div>
        <div class="status-badge ${statusClass}">
          ${app.status}
        </div>
      </div>
    `;
  }).join('');
}
