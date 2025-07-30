# 📚 Documentação Técnica - Oliveira Tattoo

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx      # Layout principal
│   ├── Header.tsx      # Navegação
│   ├── Footer.tsx      # Rodapé
│   ├── Loading.tsx     # Componente de loading
│   ├── Button.tsx      # Botão reutilizável
│   └── Form.tsx        # Componentes de formulário
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Autenticação
├── hooks/              # Hooks customizados
│   ├── useAuth.ts      # Hook de autenticação
│   └── useAppointments.ts # Hook para agendamentos
├── pages/              # Páginas da aplicação
│   ├── Homepage.tsx    # Página inicial
│   ├── About.tsx       # Sobre o estúdio
│   ├── Portfolio.tsx   # Galeria de trabalhos
│   ├── Booking.tsx     # Agendamento
│   ├── Login.tsx       # Login admin
│   └── Admin.tsx       # Painel administrativo
├── styles/             # Estilos globais
│   ├── theme.ts        # Tema (cores, tipografia)
│   └── GlobalStyles.ts # CSS global
├── types/              # Definições TypeScript
│   └── index.ts        # Interfaces e tipos
├── firebase/           # Configuração Firebase
│   └── config.ts       # Setup do Firebase
└── App.tsx            # Componente raiz
```

## 🛣️ Rotas da Aplicação

| Rota           | Componente | Descrição                 | Acesso  |
| -------------- | ---------- | ------------------------- | ------- |
| `/`            | Homepage   | Página inicial            | Público |
| `/sobre`       | About      | Sobre o estúdio           | Público |
| `/portfolio`   | Portfolio  | Galeria de trabalhos      | Público |
| `/agendamento` | Booking    | Formulário de agendamento | Público |
| `/login`       | Login      | Login administrativo      | Público |
| `/admin`       | Admin      | Painel de agendamentos    | Privado |

## 🎨 Sistema de Design

### Cores Principais

- **Primary**: `#FF6B35` (Laranja vibrante)
- **Background**: `#0A0A0A` (Preto profundo)
- **Surface**: `#1E1E1E` (Cinza escuro)
- **Text**: `#FFFFFF` (Branco)

### Tipografia

- **Heading**: Oswald (títulos)
- **Body**: Inter (texto geral)

### Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## 🔧 Componentes Principais

### AuthProvider

Gerencia estado de autenticação global

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

### Layout

Wrapper com Header e Footer

```tsx
<Layout>
  <YourPage />
</Layout>
```

### Loading

Componente de loading reutilizável

```tsx
<Loading text="Carregando..." size="lg" fullScreen />
```

### Button

Botão com variantes

```tsx
<Button variant="primary" size="lg">
  Texto do Botão
</Button>
```

## 🔥 Firebase Collections

### appointments

```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  description: string;
  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: Date;
}
```

## 🎯 Estados dos Agendamentos

1. **pending** - Aguardando aprovação
2. **approved** - Aprovado pelo admin
3. **rejected** - Rejeitado pelo admin
4. **completed** - Tatuagem realizada

## 🔐 Sistema de Autenticação

### Fluxo de Login

1. Usuário acessa `/login`
2. Faz login com email/senha
3. Sistema verifica se email está na lista de admins
4. Redireciona para `/admin` se for admin
5. Mantém estado global via AuthContext

### Proteção de Rotas

```tsx
// Em Admin.tsx
if (!user || !isAdmin) {
  return <Navigate to="/login" replace />;
}
```

## 📱 Responsividade

### Mobile First

- Design pensado primeiro para mobile
- Breakpoints progressivos
- Menu hambúrguer em telas pequenas
- Grid responsivo com `auto-fit`

### Componentes Adaptativos

```scss
@media (max-width: ${theme.breakpoints.md}) {
  // Estilos mobile
}
```

## 🎨 Estilos e Animações

### Styled Components

Todos os estilos usam styled-components com tema global

### Framer Motion

Animações suaves em:

- Entrada de páginas
- Cards do portfólio
- Modais
- Transições de estado

### Exemplo de Animação

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>
```

## 📋 Formulários

### React Hook Form

Validação e gerenciamento de estado

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

### Validações Implementadas

- Email válido
- Telefone mínimo
- Nome obrigatório
- Data futura
- Descrição mínima

## 🚀 Build e Deploy

### Comandos

```bash
npm run build    # Gera build otimizada
npm run preview  # Testa build localmente
```

### Variáveis de Ambiente

Todas as configs sensíveis em `.env`:

- Credenciais Firebase
- Lista de emails admin
- Chaves de API

## 🔧 Manutenção

### Adicionar Novo Estilo de Tatuagem

1. Edite `TattooStyle` em `src/types/index.ts`
2. Adicione filtro em `Portfolio.tsx`
3. Atualize dados de exemplo

### Modificar Cores

1. Edite `src/styles/theme.ts`
2. Cores são propagadas automaticamente

### Adicionar Nova Página

1. Crie componente em `src/pages/`
2. Adicione rota em `App.tsx`
3. Atualize navegação em `Header.tsx`

---

**Projeto desenvolvido com React + TypeScript + Firebase**
