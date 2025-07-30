# 🔧 Configuração do Novo Projeto Firebase

## Novo Projeto: `denitattoostudio`

Para obter as credenciais do novo projeto Firebase:

1. **Acesse o Firebase Console:**
   https://console.firebase.google.com/project/denitattoostudio/overview

2. **Configurar Web App:**

   - Clique em "Adicionar app" → Web (ícone </>)
   - Nome do app: "Deni Tattoo Studio"
   - Marque "Configurar Firebase Hosting"
   - Copie as credenciais geradas

3. **Ativar Serviços:**

   - **Authentication:** Vá em Authentication → Métodos de login → Email/senha (ativar)
   - **Firestore:** Já configurado na região nam5
   - **Storage:** Vá em Storage → Começar
   - **Hosting:** Já configurado

4. **Atualizar arquivo .env:**

   ```env
   VITE_FIREBASE_API_KEY=nova-api-key
   VITE_FIREBASE_AUTH_DOMAIN=denitattoostudio.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=denitattoostudio
   VITE_FIREBASE_STORAGE_BUCKET=denitattoostudio.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=novo-sender-id
   VITE_FIREBASE_APP_ID=novo-app-id
   VITE_FIREBASE_MEASUREMENT_ID=novo-measurement-id
   ```

5. **Deploy:**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

**Novo URL:** https://denitattoostudio.web.app
