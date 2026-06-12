import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

GoogleAuth.initialize({
  clientId: '304025860925-ejc1k9quboqghc6m53njs9k67ebnq7cc.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});

document.getElementById('btn-google').addEventListener('click', async () => {
  try {
    const user = await GoogleAuth.signIn();
    console.log('Login Sukses, Data User:', user);
    alert('Halo ' + user.displayName + '! Email kamu: ' + user.email);
  } catch (error) {
    console.error('Login Gagal:', error);
    alert('Login Gagal, cek log terminal/console');
  }
});
