# 🌐 Configuração de Domínio Personalizado - Firebase Hosting

## Passos para Configurar Domínio Personalizado

### 1. Comprar um Domínio

Compre um domínio em um dos provedores:

- **Google Domains**: domains.google.com
- **GoDaddy**: godaddy.com
- **Namecheap**: namecheap.com
- **Registro.br**: registro.br (para domínios .com.br)

Sugestões de domínio:

- `denitattoostudio.com`
- `oliveiratattoo.com.br`
- `denitattoostudio.com.br`

### 2. Configurar no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/project/denitattoodb/hosting)
2. Vá para **Hosting** → **Adicionar domínio personalizado**
3. Digite seu domínio (ex: `denitattoostudio.com`)
4. Siga as instruções para verificação

### 3. Configurar DNS no Provedor do Domínio

#### Para domínio principal (denitattoostudio.com):

```
Tipo: A
Nome: @
Valor: 199.36.158.100
```

#### Para subdomínio www (www.denitattoostudio.com):

```
Tipo: CNAME
Nome: www
Valor: denitattoodb.web.app
```

### 4. Aguardar Propagação

- Pode levar até 24 horas
- Firebase automaticamente provisionará certificado SSL

## Alternativa: Subdomínio Gratuito

Se preferir uma solução mais rápida, pode usar serviços como:

- **Netlify** (oferece subdomínios personalizados)
- **Vercel** (permite domínios personalizados gratuitos)

## Comandos Firebase CLI

```bash
# Listar domínios configurados
firebase hosting:sites:list

# Adicionar domínio personalizado via CLI
firebase hosting:sites:create denitattoostudio

# Deploy para domínio específico
firebase target:apply hosting main denitattoostudio
firebase deploy --only hosting:main
```

## Status Atual

- **URL Atual**: https://denitattoodb.web.app
- **Canal Preview**: https://denitattoodb--denitattoostudio-rje63awp.web.app
- **Projeto Firebase**: denitattoodb

## Próximos Passos

1. ✅ Escolher e comprar domínio
2. ✅ Configurar no Firebase Console
3. ✅ Ajustar registros DNS
4. ✅ Aguardar propagação e certificado SSL
