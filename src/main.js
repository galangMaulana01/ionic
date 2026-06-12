import { signInWithGoogle, getUser, signOut } from './services/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const userInfo = document.getElementById('userInfo');
  const userNameSpan = document.getElementById('userName');
  const userEmailSpan = document.getElementById('userEmail');

  const updateUI = (user) => {
    if (user) {
      userNameSpan.innerText = user.displayName || 'No name';
      userEmailSpan.innerText = user.email;
      loginBtn.style.display = 'none';
      userInfo.style.display = 'block';
    } else {
      loginBtn.style.display = 'block';
      userInfo.style.display = 'none';
    }
  };

  // initial check
  const currentUser = getUser();
  updateUI(currentUser);

  loginBtn?.addEventListener('click', async () => {
    try {
      const user = await signInWithGoogle();
      updateUI(user);
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  });

  logoutBtn?.addEventListener('click', async () => {
    await signOut();
    updateUI(null);
    alert('Logged out');
  });
});
