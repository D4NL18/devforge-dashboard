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

## 📁 Páginas e Dashboards do Sistema

O sistema é composto por diversas telas e dashboards focados em diferentes áreas da gestão empresarial. Abaixo está o detalhamento de cada um deles:

### 💰 Dashboard Financeiro de Transações (`/transactions`)
O coração financeiro do sistema. Ele fornece uma visão clara do fluxo de caixa, lucros e saúde patrimonial.
- **Cards de Indicadores (KPIs)**: Exibe instantaneamente o Caixa Mínimo, Caixa Atual (com alerta visual em vermelho se o valor estiver abaixo do mínimo), Faturamento Total e Lucro.
- **Gráficos**:
  - **Gráfico de Pizza (Gastos por Setor)**: Mostra como as despesas da empresa estão distribuídas (Marketing, Infraestrutura, Projetos, etc).
- **Tabelas de Relatórios Contábeis (Paginadas)**:
  - **DRE (Demonstração do Resultado do Exercício)**: Tabela consolidando as métricas de receita e despesa do exercício.
  - **Balanço Patrimonial**: Comparativo detalhado entre Ativos (Caixa, Contas a Receber, Estoques) e Passivos + Patrimônio Líquido.
  - **Fluxo de Caixa**: Uma listagem detalhada de todas as entradas e saídas diárias, equipada com uma barra de busca avançada, filtros por categoria (Marketing, Projetos, etc), filtros de valores (Mín/Máx) e edição direta dos registros.

### 👥 Dashboard de Clientes (`/clients`)
Focado em métricas de retenção, vendas e relacionamento.
- **Gráficos**:
  - **Gráficos de Pizza**: Diversificação de Clientes (concentração de receita por cliente) e Taxa de Inadimplência.
  - **Gráfico de Barras**: Churn de Receita (%) mensal.
  - **Gráficos de Linha**: Custo de Aquisição de Cliente (CAC) e Lifetime Value (LTV) ao longo dos meses.
- **Tabela de Clientes**: Lista detalhada dos clientes e seus respectivos projetos ativos, incluindo valor inadimplente e dias de atraso. Permite busca por nome e filtro por tipo de projeto ou range financeiro.

### 📊 Dashboard de Projetos (`/projects`)
Visão voltada para o acompanhamento da rentabilidade e do andamento de diferentes projetos.
- **Gráficos**:
  - **Diversificação**: Gráfico de pizza mostrando os tipos de projeto em andamento.
  - **Gráficos de Rentabilidade (Barras)**: Faturamento por Projeto, Lucro por Projeto, Margem por Projeto (%), além das mesmas métricas agregadas por *Tipo de Projeto*.
- **Tabela de Projetos**: Lista de projetos ativos com colunas de Faturamento, Prazo de Entrega e Tipo de Projeto. Inclui integração com a store do MobX para filtragem avançada dinâmica.

### 🔐 Autenticação e Sistema
- **Login (`/`)**: Autenticação de usuários.
- **Recuperação de Senha (`/forgot-password` e `/reset-password`)**: Fluxos para redefinir o acesso via token de e-mail.
- **Home (`/home`)**: Visão geral e atalhos rápidos do sistema.
- **Components (`/components`)**: Design System vivo que serve como guia de estilos. Demonstra todos os componentes isolados (tabelas, gráficos, selects, inputs de range) funcionando na prática para facilitar a reutilização.
- **Páginas de Fallback**: `Not Implemented` (para botões em construção) e `Not Found` (erro 404).

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