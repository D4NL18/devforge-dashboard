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

## 📁 Estrutura de Páginas

A aplicação já vem pré-configurada com as seguintes rotas e páginas fundamentais para sistemas administrativos e dashboards:

- **Autenticação**:
  - `Login` (`/`)
  - `Esqueci a Senha` (`/forgot-password`)
  - `Redefinir Senha` (`/reset-password`)
- **Painel Principal**:
  - `Home` (`/home`): Visão geral do dashboard.
- **Interface e Componentes**:
  - `Components` (`/components`): Página de demonstração do UI Kit (componentes reutilizáveis da aplicação).
- **Outras Telas**:
  - `Not Implemented` (`/not-implemented`): Página para recursos futuros ou em desenvolvimento.
  - `Not Found` (`*`): Página de erro 404 (Rota não encontrada).

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