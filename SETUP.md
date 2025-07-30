# 🎨 Oliveira Tattoo - Guia de Configuração

## ✅ Projeto Criado com Sucesso!

Seu site profissional para estúdio de tatuagem está pronto! Aqui está tudo que foi implementado:

### 📋 Funcionalidades Implementadas

✅ **Página Inicial** - Hero section com animações e chamadas para ação
✅ **Página Sobre** - História do estúdio, localização e contato
✅ **Portfólio** - Galeria com filtros por estilo de tatuagem
✅ **Sistema de Agendamento** - Formulário completo com validação
✅ **Área Administrativa** - Painel para gerenciar agendamentos
✅ **Autenticação Firebase** - Login seguro para administradores
✅ **Design Responsivo** - Mobile-first, moderno e escuro
✅ **Animações Suaves** - Framer Motion em toda aplicação

### 🚀 Como Usar

#### 1. Configure o Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative **Authentication** → Email/Password
4. Ative **Firestore Database** (modo produção)
5. Ative **Storage** (para futuras imagens)

#### 2. Configure as Variáveis de Ambiente

1. Copie `.env.example` para `.env`
2. Substitua pelos seus dados do Firebase:

```env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-project-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=seu-app-id

VITE_ADMIN_EMAILS=admin@oliveiratattoo.com,seu@email.com
```

#### 3. Crie Usuário Administrador

1. Acesse o Firebase Authentication
2. Crie um usuário com email que está na lista `VITE_ADMIN_EMAILS`
3. Use esse email para fazer login em `/login`

#### 4. Personalize o Conteúdo

**Informações do Estúdio:**

- `src/components/Footer.tsx` - Contatos e endereço
- `src/pages/About.tsx` - História e localização
- `src/components/Header.tsx` - Nome do estúdio

**Cores e Design:**

- `src/styles/theme.ts` - Todas as cores e tipografia

**Google Maps:**

- Substitua o placeholder em `About.tsx` por iframe real

### 📱 Navegação do Site

- **/** - Página inicial
- **/sobre** - Sobre o estúdio
- **/portfolio** - Galeria de trabalhos
- **/agendamento** - Formulário de agendamento
- **/login** - Login administrativo
- **/admin** - Painel de agendamentos (requer login)

### 🎯 Próximos Passos

1. **Adicione suas imagens reais** nos placeholders
2. **Configure Google Maps** com seu endereço
3. **Personalize textos** com informações do seu estúdio
4. **Teste o sistema** criando agendamentos
5. **Implante online** (Vercel, Netlify, etc.)

### 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Verificar erros
npm run lint
```

### 🔧 Personalização Rápida

**Mudar nome do estúdio:**

- Procure por "Oliveira Tattoo" nos arquivos
- Substitua pelo nome do seu estúdio

**Adicionar novo estilo de tatuagem:**

- Edite `src/types/index.ts` → `TattooStyle`
- Adicione o filtro em `src/pages/Portfolio.tsx`

**Modificar cores:**

- Edite `src/styles/theme.ts` → `colors`

### 📞 Próximas Funcionalidades

- [ ] Upload de imagens para portfólio
- [ ] Notificações por email
- [ ] Integração WhatsApp
- [ ] Blog/artigos
- [ ] Sistema de avaliações

---

**🎉 Seu site está pronto para uso!**

Acesse http://localhost:5174 para ver o resultado.

Para dúvidas, consulte a documentação do React, Firebase e Styled Components.
