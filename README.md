# Ituiumapa

Plataforma colaborativa de mapeamento de problemas urbanos para Ituiutaba, MG, com
catálogo integrado de bibliotecas públicas (simulação do Koha ILS).

## Stack

- **React 18** + **Vite** — frontend
- **Leaflet** + **react-leaflet** — mapa interativo com tiles do OpenStreetMap (OSM)
- **CSS Modules** — estilização isolada por componente
- Backend **simulado** via hooks (`useAuth`, `useProblems`, `useKohaCatalog`) que
  imitam chamadas assíncronas a uma API REST real

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Login de demonstração: `joao@email.com` / `123456`

## Estrutura de diretórios

```
ituiumapa/
├── index.html                  # ponto de entrada HTML (carrega o CSS do Leaflet)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # bootstrap do React
    ├── App.jsx                  # roteamento de páginas via estado local
    │
    ├── components/               # componentes reutilizáveis de UI
    │   ├── Navbar.jsx
    │   ├── Toast.jsx
    │   ├── MapSidebar.jsx        # filtros do mapa (tipos, período, etc.)
    │   ├── AddProblemModal.jsx   # modal "Adicionar novo problema"
    │   ├── BookCard.jsx          # card de livro no catálogo
    │   └── BookDetailModal.jsx   # modal de detalhes/reserva do livro
    │
    ├── pages/                    # páginas / telas completas
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── ForgotPasswordPage.jsx
    │   ├── MapPage.jsx            # tela principal com mapa OSM
    │   └── LibraryPage.jsx        # tela do catálogo da biblioteca (Koha)
    │
    ├── hooks/                    # lógica de estado e "chamadas de API" simuladas
    │   ├── useAuth.js             # login / cadastro / recuperação de senha
    │   ├── useProblems.js         # CRUD dos pins do mapa
    │   ├── useMapFilters.js       # estado dos filtros da sidebar
    │   ├── useKohaCatalog.js      # simula API REST do Koha (busca/reserva)
    │   └── useToast.js            # notificações temporárias
    │
    ├── data/                     # "banco de dados" mockado
    │   ├── users.js               # usuários cadastrados
    │   ├── problems.js            # ocorrências urbanas (seed)
    │   ├── problemTypes.js        # categorias de problema (cores/letras)
    │   └── books.js               # catálogo de livros (seed do Koha)
    │
    ├── utils/
    │   └── mapHelpers.js          # ícones customizados do Leaflet, geocoding mock
    │
    └── styles/
        ├── global.css             # variáveis CSS e reset
        ├── Auth.module.css        # login / cadastro / recuperar senha
        ├── Navbar.module.css
        ├── MapSidebar.module.css
        ├── MapPage.module.css
        ├── Modal.module.css       # modal genérico reutilizado
        ├── Library.module.css
        └── Toast.module.css
```

## Integrações reais (próximos passos)

Os hooks já estão desenhados para troca direta por chamadas HTTP reais:

- `useAuth` → `POST /api/auth/login`, `/register`, `/forgot-password`
- `useProblems` → `GET/POST/DELETE /api/problems`
- `useKohaCatalog` → API REST do Koha (`/api/v1/biblios`, `/api/v1/holds`)
- `mapHelpers.reverseGeocode` → API de geocodificação reversa do Nominatim (OSM)
