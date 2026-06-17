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

Contas de demonstração:
- **Cidadão**: `joao@email.com` / `123456`
- **Prefeitura** (conta institucional, com permissão para atualizar status): `prefeitura@ituiutaba.mg.gov.br` / `prefeitura123`

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
    │   ├── ProblemDetailModal.jsx # modal de detalhe do problema + painel da Prefeitura
    │   ├── StatusIcon.jsx        # ícone reutilizável de status (triângulo/círculo/hexágono)
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
    │   ├── useProblems.js         # CRUD dos pins do mapa + updateProblemStatus (Prefeitura)
    │   ├── useMapFilters.js       # estado dos filtros da sidebar
    │   ├── useKohaCatalog.js      # simula API REST do Koha (busca/reserva)
    │   └── useToast.js            # notificações temporárias
    │
    ├── data/                     # "banco de dados" mockado
    │   ├── users.js               # usuários cadastrados (cidadãos + Prefeitura)
    │   ├── problems.js            # ocorrências urbanas (seed, com status e nota da prefeitura)
    │   ├── problemTypes.js        # categorias de problema (cores/letras)
    │   ├── problemStatus.js       # estados possíveis: não visto / em revisão / resolvido
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

## Conta da Prefeitura

A conta institucional (`role: 'prefeitura'` em `src/data/users.js`) é a única autorizada a
atualizar o status de um problema reportado. Qualquer usuário pode clicar em um pin do mapa
e ver os detalhes do chamado (endereço, descrição, status atual e a resposta da prefeitura,
se houver) através do `ProblemDetailModal`. Quando o usuário logado tem `role === 'prefeitura'`,
um painel extra aparece dentro do mesmo modal permitindo:

- Selecionar um dos três estados: **Não visto** (hexágono vermelho), **Em revisão**
  (triângulo amarelo) ou **Resolvido** (círculo verde)
- Escrever uma nota de resposta ao cidadão (ex: "Piscina esvaziada e esterilizada
  contra larvas")
- Salvar a atualização, que persiste em memória via `useProblems().updateProblemStatus`

Os mesmos ícones de status aparecem como um pequeno selo no canto superior direito de
cada pin do mapa, permitindo identificar o estado de cada ocorrência sem precisar abrir
o modal.

## Integrações reais (próximos passos)

Os hooks já estão desenhados para troca direta por chamadas HTTP reais:

- `useAuth` → `POST /api/auth/login`, `/register`, `/forgot-password`
- `useProblems` → `GET/POST/DELETE /api/problems`, `PATCH /api/problems/:id/status` (Prefeitura)
- `useKohaCatalog` → API REST do Koha (`/api/v1/biblios`, `/api/v1/holds`)
- `mapHelpers.reverseGeocode` → API de geocodificação reversa do Nominatim (OSM)
