# Conecta Saúde — Sistema de Atendimento Médico

O **Conecta Saúde** é uma plataforma de atendimento médico desenvolvida com **HTML5, CSS3, JavaScript e JSON**. O projeto é **100% independente**, sem dependência de banco de dados, MySQL ou backend server-side, com foco total na experiência do usuário, design moderno e fidelidade aos wireframes do sistema.

---

## 📂 Estrutura do Projeto

```text
conecta-saude/
│
├── index.html            # Página inicial pública do sistema
├── cadastro.html         # Formulário de cadastro de usuários (Wireframe 1)
├── login.html            # Tela de login e autenticação (Wireframe 2)
├── esqueci-senha.html    # Fluxo em etapas de recuperação de senha
├── paciente.html         # Dashboard inicial do paciente (Wireframe 3)
├── profissional.html     # Dashboard do médico / profissional (Wireframe 4)
│
├── css/
│   ├── style.css         # Estilos globais, temas e componentes
│   └── responsivo.css    # Adaptação para celular, tablet e desktop
│
├── js/
│   ├── app.js            # Inicialização de dados (JSON/localStorage) e utilitários
│   ├── login.js          # Autenticação e roteamento de perfil
│   ├── cadastro.js       # Validações, máscara de CPF e salvamento
│   ├── paciente.js       # Renderização de consultas do paciente e modal de agendamento
│   ├── profissional.js   # Tabela de atendimentos, métricas e atualização de status
│   └── esqueci-senha.js # Lógica de busca de e-mail e redefinição de senha
│
├── json/
│   ├── usuarios.json     # Usuários fictícios iniciais
│   ├── consultas.json    # Agendamentos padrão de teste
│   └── configuracoes.json# Configurações do sistema
│
├── assets/               # Imagens e ícones
└── README.md             # Documentação do projeto
```

---

## 🚀 Como Abrir e Executar o Projeto

1. Abra a pasta `conecta-saude` no **Visual Studio Code** (ou no seu editor de preferência).
2. Para visualizar o projeto, abra o arquivo `index.html` diretamente no navegador (duplo clique ou usando a extensão *Live Server* do VS Code).
3. Todas as funcionalidades (cadastro, login, agendamento de consultas, recuperação de senha e alteração de status) funcionam de forma independente no próprio navegador usando `localStorage`.

---

## 🧪 Como Testar os Perfis do Sistema

### 1. Testar Perfil de Paciente (Wireframe 3)
- Acesse `login.html`.
- Use as credenciais padrão de paciente:
  - **E-mail / CPF:** `joao@email.com` ou `123.456.789-00`
  - **Senha:** `123456`
- **O que testar:**
  - Visualize o painel do paciente com a mensagem de boas-vindas e as próximas consultas ("Dr. Pedro Candido" e "Dra. Isabela Martins").
  - Clique no botão **"Agendar"** no cabeçalho.
  - Escolha o profissional, a data, o horário e confirme. A nova consulta aparecerá instantaneamente na tela.

---

### 2. Testar Perfil de Profissional / Médico (Wireframe 4)
- Acesse `login.html`.
- Use as credenciais padrão de profissional:
  - **E-mail / CPF:** `pedro@conectasaude.com` ou `111.222.333-44`
  - **Senha:** `123456`
- **O que testar:**
  - Visualize o perfil do **Dr. Pedro Candido** (Ortopedista).
  - Observe os cards de resumo do dia (`04 Consultas hoje`, `03 Retornos hoje`, `30 Pacientes online`).
  - Veja a tabela de **Próximos Atendimentos** (`João da Silva`, `Daniel Boming`, `Filipe Valentim`).
  - Altere o status de uma consulta no dropdown da tabela (ex: de *Confirmado* para *Concluído*).

---

### 3. Testar Cadastro de Novo Usuário (Wireframe 1)
- Acesse `cadastro.html`.
- Preencha o formulário:
  - **Nome:** Seu Nome
  - **E-mail:** `seuemail@exemplo.com`
  - **CPF:** Digite os 11 números (a máscara formatará automaticamente).
  - **Senha & Confirmar senha:** Informe senhas iguais (mínimo de 6 caracteres).
  - **Tipo da conta:** Escolha *Paciente* ou *Profissional de Saúde*.
- Clique em **Avançar**. O sistema validará as informações, armazenará o novo perfil e direcionará para o `login.html`.

---

### 4. Testar Recuperação de Senha
- Acesse `esqueci-senha.html`.
- Digite `joao@email.com` e clique em **Verificar E-mail**.
- Digite uma nova senha e confirme.
- Faça login com a nova senha cadastrada.

---

## 📱 Responsividade & Experiência Visual
O site foi construído com design responsivo fluido, funcionando perfeitamente em telas de **computador**, **notebook**, **tablet** e **celular** com suporte a menu hambúrguer interativo.
