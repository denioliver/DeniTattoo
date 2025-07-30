// Script para criar usuário administrador
// Execute este código uma vez no console do navegador em localhost:5174

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './src/firebase/config';

// Função para criar usuário administrador
export async function createAdminUser() {
  try {
    const email = 'admin@oliveiratattoo.com';
    const password = 'admin123456'; // Mude para uma senha segura

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✅ Usuário administrador criado com sucesso!');
    console.log('📧 Email:', email);
    console.log('🔑 Senha:', password);
    console.log('👤 UID:', userCredential.user.uid);

    return userCredential.user;
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    throw error;
  }
}

// Para executar no console:
// createAdminUser();
