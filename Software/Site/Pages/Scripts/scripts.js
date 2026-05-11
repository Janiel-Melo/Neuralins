// ==========================================================================
// Gerenciamento da Interface (Alternância de Abas)
// ==========================================================================
function switchTab(tabId) {
  const loginForm = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const alertBox = document.getElementById('alert-box');

  // Limpa alertas ativos ao trocar de aba
  alertBox.className = 'alert-box hidden';

  if (tabId === 'login') {
    loginForm.classList.replace('hidden-form', 'active-form');
    registerForm.classList.replace('active-form', 'hidden-form');
    tabBtns[0].classList.add('active');
    tabBtns[1].classList.remove('active');
  } else {
    registerForm.classList.replace('hidden-form', 'active-form');
    loginForm.classList.replace('active-form', 'hidden-form');
    tabBtns[1].classList.add('active');
    tabBtns[0].classList.remove('active');
  }
}

// ==========================================================================
// Funções Auxiliares de UI
// ==========================================================================
function showAlert(message, type) {
  const alertBox = document.getElementById('alert-box');
  alertBox.textContent = message;
  alertBox.className = `alert-box ${type}`;
}

function setLoading(buttonId, isLoading) {
  const button = document.getElementById(buttonId);
  const textSpan = button.querySelector('.btn-text');
  const loader = button.querySelector('.loader');

  if (isLoading) {
    textSpan.classList.add('hidden');
    loader.classList.remove('hidden');
    button.disabled = true;
  } else {
    textSpan.classList.remove('hidden');
    loader.classList.add('hidden');
    button.disabled = false;
  }
}

// ==========================================================================
// Integração de Banco de Dados com Supabase
// ==========================================================================

// Processamento do Formulário de Registro
document.getElementById('form-register').addEventListener('submit', async (e) => {
  e.preventDefault();
  setLoading('btn-register', true);

  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  try {
    const { data, error } = await supabaseclient.auth.signUp({
      email: email,
      password: password,
      options: {emailRedirectTo: 'http://127.0.0.1:5500/Neuralins/Software/Site/Pages/dashboard.html?#',
        data: {
          full_name: name,
        }
      }
    });

    if (error) throw error;

    showAlert('Cadastro concluído com sucesso! Verifique seu e-mail para confirmar a conta.', 'success');
    document.getElementById('form-register').reset();
    
} catch (error) {
  console.error('ERRO SUPABASE:', error);

  let errorMsg = error.message || 'Não foi possível concluir o registro.';

  showAlert(errorMsg, 'error');
} finally {
    setLoading('btn-register', false);
  }
});

// Processamento do Formulário de Login
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  setLoading('btn-login', true);

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const { data, error } = await supabaseclient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    showAlert('Autenticação bem-sucedida. Carregando dados...', 'success');
    
    // Redirecionamento bem-sucedido para a página do Dashboard
    setTimeout(() => {
      window.location.href = '/dashboard.html'; 
    }, 1500);

  } catch (error) {
    showAlert('Credenciais inválidas. Verifique seu e-mail e senha.', 'error');
    setLoading('btn-login', false);
  }
});