# Aplicação Vue 3 de Gerenciamento de Endereços

Esta é uma aplicação Vue 3 simples para gerenciamento de endereços utilizando o Bootstrap 5.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn) instalados em seu sistema.

## Configuração

1. Clone este repositório:

```
git clone https://github.com/araodomingosjoao/cep-explorer-app
```

2. Navegue para a pasta do projeto:

```
cd cep-explorer-app
```

3. Instale as dependências:

```
npm install
# ou
yarn install
```

## Rodando a Aplicação

4. Inicie o servidor de desenvolvimento:

```
npm run dev
# ou
yarn serve
```

5. Acesse a aplicação no seu navegador:

```
http://localhost:5173/
```

Claro! Aqui está o README atualizado com uma seção explicando que é necessário rodar o backend Laravel antes de rodar a aplicação Vue:

```markdown
# Aplicação Vue 3 de Gerenciamento de Endereços

Esta é uma aplicação Vue 3 simples para gerenciamento de endereços utilizando o Bootstrap 5.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn) instalados em seu sistema.

## Configuração

1. Clone este repositório:

```
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Navegue para a pasta do projeto:

```
cd seu-repositorio
```

3. Instale as dependências:

```
npm install
# ou
yarn install
```

## Rodando a Aplicação

**Importante: Antes de rodar a aplicação Vue, é necessário rodar o backend Laravel que irá fornecer os dados. Certifique-se de seguir as instruções de instalação e execução do backend.**

4. Inicie o servidor de desenvolvimento:

```
npm run serve
# ou
yarn serve
```

5. Acesse a aplicação no seu navegador:

```
http://localhost:8080/
```

## Executando o Backend Laravel

Certifique-se de ter o PHP, Composer e um servidor de banco de dados (como MySQL) configurados em seu sistema.

1. Clone o repositório do backend Laravel:

```
git clone https://github.com/araodomingosjoao/cep-explorer-api
```

2. Navegue para a pasta do projeto do backend:

```
cd cep-explorer-api
```

3. Instale as dependências:

```
composer install
```

4. Crie o arquivo `.env`:

```
cp .env.example .env
```

5. Configure as informações do banco de dados no arquivo `.env`.

6. Gere a chave de aplicação:

```
php artisan key:generate
```

7. Rode as migrações para criar as tabelas do banco de dados:

```
php artisan migrate
```

8. Inicie o servidor:

```
php artisan serve
```

Agora, tanto o backend Laravel quanto a aplicação Vue devem estar rodando e você poderá acessar a aplicação completa no seu navegador.

## Personalização

- Você pode personalizar os estilos da aplicação editando o arquivo `src/main.css`.
- O componente `CardAddress` é utilizado para exibir os endereços. Personalize o conteúdo e o estilo deste componente conforme necessário.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs e novos recursos. Basta fazer um fork deste repositório, criar um branch para sua feature/fix e enviar um pull request.

## Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).
