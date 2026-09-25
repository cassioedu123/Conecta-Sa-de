document.addEventListener('DOMContentLoaded', () => {
  let currentUser = getCurrentUser();

  if (!currentUser || currentUser.tipo !== 'profissional') {
    const users = getStoredUsers();
    currentUser = users.find(u => u.tipo === 'profissional') || {
      id: "3",
      nome: "Dr. Pedro Candido",
      especialidade: "Ortopedista",
      tipo: "profissional"
    };
  }

  renderDoctorDashboard(currentUser);
});

function renderDoctorDashboard(doctor) {
  const doctorNameEl = document.getElementById('doctorName');
  const doctorRoleEl = document.getElementById('doctorRole');
  const welcomeDoctorEl = document.getElementById('welcomeDoctorName');

  if (doctorNameEl) doctorNameEl.textContent = doctor.nome;
  if (doctorRoleEl) doctorRoleEl.textContent = doctor.especialidade || 'Ortopedista';
  if (welcomeDoctorEl) welcomeDoctorEl.textContent = doctor.nome;

  renderAppointmentsTable(doctor.id);
}

function renderAppointmentsTable(doctorId) {
  const tableBody = document.getElementById('doctorAppointmentsTableBody');
  if (!tableBody) return;

  const allApps = getStoredAppointments();
  
  const defaultSchedule = [
    { horario: '08:00', paciente: 'João da Silva', tipo: 'Consulta', motivo: 'Dor no joelho', status: 'Confirmado' },
    { horario: '09:00', paciente: 'Daniel Boming', tipo: 'Consulta', motivo: 'Luxação no ombro', status: 'Confirmado' },
    { horario: '10:00', paciente: 'Horário livre', tipo: '-', motivo: '-', status: '-' },
    { horario: '11:30', paciente: 'Filipe Valentim', tipo: 'Retorno', motivo: 'Fratura no punho', status: 'Confirmado' }
  ];

  const doctorApps = allApps.filter(a => a.profissionalId === doctorId || a.medicoNome?.includes('Pedro'));

  const rows = defaultSchedule.map((item, index) => {
    const match = doctorApps.find(a => a.horario === item.horario);
    const finalItem = match ? {
      horario: match.horario,
      paciente: match.pacienteNome,
      tipo: match.tipo,
      motivo: match.motivo,
      status: match.status,
      id: match.id
    } : item;

    const isFree = finalItem.paciente === 'Horário livre';
    const statusColor = finalItem.status === 'Confirmado' || finalItem.status === 'Confirmada' || finalItem.status === 'Concluído'
      ? 'color: #0d8a80; font-weight: 700;'
      : (finalItem.status === 'Aguardando confirmação' ? 'color: #e66700; font-weight: 700;' : 'color: #666;');

    return `
      <tr>
        <td><strong>${finalItem.horario}</strong></td>
        <td>${finalItem.paciente}</td>
        <td>${finalItem.tipo}</td>
        <td>${finalItem.motivo}</td>
        <td style="${statusColor}">
          ${isFree ? '-' : `
            <select class="form-select" style="padding: 0.2rem 0.5rem; font-size: 0.85rem; width: auto;" onchange="updateAppointmentStatus('${finalItem.id || index}', this.value)">
              <option value="Confirmado" ${finalItem.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
              <option value="Concluído" ${finalItem.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
              <option value="Cancelado" ${finalItem.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
            </select>
          `}
        </td>
      </tr>
    `;
  }).join('');

  tableBody.innerHTML = rows;
}

function updateAppointmentStatus(appId, newStatus) {
  const apps = getStoredAppointments();
  const appIndex = apps.findIndex(a => a.id === appId);
  
  if (appIndex !== -1) {
    apps[appIndex].status = newStatus;
    saveStoredAppointments(apps);
  }
}
