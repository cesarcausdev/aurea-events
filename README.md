# Áurea Events

Protótipo frontend criado a partir do Figma Make para um projeto estudantil.

## Como rodar localmente

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado no terminal, normalmente `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

Os arquivos finais são gerados na pasta `dist`.

## Deploy no Netlify

As configurações já estão em `netlify.toml`:

- build command: `npm run build`
- publish directory: `dist`

Ao conectar o repositório no Netlify, ele deve usar essas configurações automaticamente.

Se aparecer "Page not found" no Netlify, confira nas configurações do site:

- Base directory: deixe vazio
- Build command: `npm run build`
- Publish directory: `dist`

Depois clique em "Clear cache and deploy site" para forçar um novo deploy.
# aurea-events
