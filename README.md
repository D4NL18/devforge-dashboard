# DevForge Dashboard

Uma aplicação de dashboard moderna construída com React e TypeScript, projetada para ser um template escalável com gerenciamento de estado via MobX e roteamento avançado com React Router DOM.

## 🚀 Tecnologias e Ferramentas

Este projeto foi construído utilizando as seguintes tecnologias:

- **[React 19](https://react.dev/)**: Biblioteca principal para construção de interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para JavaScript, garantindo maior segurança e previsibilidade do código.
- **[React Router DOM (v7)](https://reactrouter.com/)**: Gerenciamento de rotas da aplicação.
- **[MobX](https://mobx.js.org/README.html)**: Gerenciamento de estado global simples, escalável e reativo.
- **[Sass (SCSS)](https://sass-lang.com/)**: Pré-processador CSS para estilização avançada e modular.
- **Ícones**: Utiliza [Lucide React](https://lucide.dev/) e [React Icons](https://react-icons.github.io/react-icons/).
- **[clsx](https://github.com/lukeed/clsx)**: Utilitário para construção de classes CSS de forma condicional.

## 🏗️ Arquitetura do Projeto

A arquitetura do projeto foi desenhada para promover alta coesão, reutilização de código e separação clara de responsabilidades (Separation of Concerns).

- **`src/Components/`**: Contém todos os componentes reutilizáveis e "burros" (dumb components) da aplicação, que são orientados a props e não possuem estado global complexo. Isso inclui barras de navegação (`Navbar`), rodapés (`Footer`), tabelas padronizadas (`PaginatedTable`), botões, inputs, modais e cards informativos. Ao centralizar esses elementos, garantimos uma identidade visual consistente em todo o dashboard e facilidade de manutenção.
- **`src/Pages/`**: Abriga os "smart components" (páginas completas). Cada pasta aqui representa uma tela inteira na aplicação. As páginas consomem os blocos visuais da pasta `Components` e os integram com a lógica de negócios, gerenciamento de rotas e consumo de estado.
- **`src/types/`**: Contém as definições de tipos e interfaces do TypeScript, essenciais para garantir contratos de dados consistentes entre APIs, componentes e stores do MobX.
- **`src/resources/`**: Onde residem arquivos de internacionalização ou constantes de texto (`strings.ts`), facilitando a manutenção de textos, labels e mensagens de erro sem precisar alterar a camada visual dos componentes.
- **Roteamento Centralizado**: A gerência das páginas é feita através do arquivo `routes.tsx`, que centraliza a árvore de navegação usando o `React Router DOM`.
- **Estado Global**: Gerenciado através do MobX, o que permite criar *stores* reativas focadas nas entidades do domínio, abstraindo as regras de negócio dos componentes React.

## 📁 Objetivo das Páginas

Cada página (rota) da aplicação possui uma responsabilidade bem definida dentro do ecossistema do dashboard:

- **Login (`/`)**: Porta de entrada do sistema. Responsável por coletar as credenciais do usuário, autenticar e estabelecer a sessão de acesso protegido.
- **Esqueci a Senha (`/forgot-password`)**: Fluxo de recuperação de conta. Permite ao usuário solicitar um e-mail com instruções para recuperar o acesso.
- **Redefinir Senha (`/reset-password`)**: Tela que processa o token de segurança e permite que o usuário crie uma nova senha de forma segura.
- **Home (`/home`)**: O painel principal do Dashboard. Apresenta métricas-chave, atalhos rápidos e gráficos em uma visão panorâmica, fornecendo ao usuário um resumo imediato e acionável das informações mais importantes.
- **Components (`/components`)**: Uma espécie de "Styleguide" ou "Design System" vivo da aplicação. O objetivo desta página é demonstrar e documentar visualmente como os componentes genéricos (como botões, inputs de texto, selects, tabelas e gráficos) funcionam na prática, agilizando o trabalho da equipe de desenvolvimento ao construir novas telas.
- **Not Implemented (`/not-implemented`)**: Página de *placeholder* amigável. Usada para sinalizar links ou botões de funcionalidades que já estão previstas no layout ou no menu, mas cujo desenvolvimento técnico ainda será feito no futuro.
- **Not Found (`*`)**: Rota de tratamento de erro (404). Exibe uma mensagem de "Página não encontrada" com opções de retorno seguro para a `Home` sempre que o usuário tentar acessar uma URL inexistente.

## ⚙️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) e o gerenciador de pacotes NPM (ou Yarn) instalados na sua máquina.

### Instalação

1. Clone o repositório para a sua máquina:
```bash
git clone https://github.com/D4NL18/devforge-dashboard.git
```

2. Acesse a pasta do projeto:
```bash
cd devforge-dashboard
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

### Rodando Localmente

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm start
# ou
yarn start
```

A aplicação será aberta no seu navegador padrão no endereço [http://localhost:3000](http://localhost:3000). A página será recarregada automaticamente sempre que você salvar alterações no código.

## 🛠️ Scripts Disponíveis

No diretório do projeto, você pode rodar os seguintes comandos (via `npm` ou `yarn`):

- `start`: Inicia a aplicação em modo de desenvolvimento.
- `build`: Cria a versão otimizada de produção da aplicação na pasta `build`.
- `test`: Inicia o runner de testes no modo interativo.
- `eject`: (Atenção: Ação irreversível) Remove a camada de abstração do `react-scripts`, expondo todas as configurações do Webpack, Babel, ESLint, etc. para personalização avançada.

## 🤝 Contribuição

Sinta-se à vontade para contribuir com o projeto! Caso encontre problemas ou tenha sugestões de novas funcionalidades, abra uma *Issue* ou envie um *Pull Request* detalhando a mudança.