## Instalação

Clonar o repositório

```bash
  git clone [https://github.com/ThiagoFranca4180/apiGrow.git)
```

Instalar as depêndencias do projeto

```bash
   npm install
```

Iniciar o projeto

```bash
  npm run dev
```

## Documentação da API

Esta API foi desenvolvida para gerenciar informações sobre recados. Ela oferece funcionalidades para criar, ler, atualizar e excluir recados.
Além de criar e fazer o login de usuários.

### Cria um usuario
```http
  POST /signup
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `String` | **Obrigatório**. id do usuario |
| `Nome`      | `String` | **Obrigatório**. Nome do usuário |
| `E-mail`      | `String` | **Obrigatório**. E-mail do usuário |
| `Senha`      | `String` | **Obrigatório**. Senha do usuário |

### Login
```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `E-mail`      | `String` | **Obrigatório**. E-mail do usuário |
| `Senha`      | `String` | **Obrigatório**. Senha do usuário |


#### Retorna uma lista de todos os usuários e seus recados cadastrados.

```http
  GET /users
```



#### Criar um recado

```http
  POST /usuario/recados/
```

| Parâmetro   | Tipo               | Descrição                                   |
| :---------- | :----------------- | :------------------------------------------ |
| `Access token`        | `string`           | **Obrigatório**. token do usuario |
| `Recados`   | `Array de objetos` | **Obrigatório**. lista de com recados |
| `Titulo`       | `String`           | **Obrigatório**. titulo do recado |
| `Descrição `      | `string`           | **Obrigatório**. descrição do recado |



#### Retorna todos os recados específicos com base no ID fornecido na URL.

```http
  GET /users/recados/:id/:idRecados
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `String` | **Obrigatório**. id do usuario para filtragem

#### Atualiza recado existente com base no ID do usuario e ID do recado fornecido na URL.

```http
  PUT /usuario/recados/:id/:idRecados
```

| Parâmetro   | Tipo               | Descrição                                   |
| :---------- | :----------------- | :------------------------------------------ |
| `Access token`        | `string`           | **Obrigatório**. token do usuario |
| `id`        | `string`           | **Obrigatório**. id do recado |
| `Recados`   | `Array de objetos` | **Obrigatório**. lista de com recados |
| `Titulo`       | `String`           | **Obrigatório**. titulo do recado |
| `Descrição `      | `string`           | **Obrigatório**. descrição do recado |



### Exclui um recado com base no ID do recado fornecido na URL.
```http
  DELETE /usuario/recados/:id/idRecados
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Access token`        | `string`           | **Obrigatório**. token do usuario |
| `idRecado`      | `String` | **Obrigatório**. id do recado |






stack
