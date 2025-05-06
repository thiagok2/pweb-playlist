# Roteiro do projeto

https://dontpad.com/pweb2ifalrl-1

1. Criar projeto/pasta no VSCode
2. Abrir terminal executar
	```sh
		npm init 
	```

Instalar git
	Instalar git no seu SO
	
	Após instalar, executar no terminal:
```sh
	git init
```
3. O package.json foi criado

4. Instalar Dependências Necessárias. Instale o Sequelize, Pg(postgresql), dovenv e express.
Ronar no terminal
```sh
	npm install sequelize pg dotenv express
```


A pasta node_modules criada e com muitos arquivos.
Criar o arquivo .gitiginore na raiz do projeto e adiciona a pasta node_modules e o arquivo .env para ser ignorado pelo git.
Conteúdo do .gitiginore

```
node_modules
.env
```

5.  Organizar o projeto
	a) Criar a pasta models e a pasta config. Ambos na parta raiz do projeto;
	b) Criar arquivo .env na pasta raiz

6. Escrever as credenciais do banco local no .env.
Ex.:
```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_PORT=5432 #3306 para mysql	
``` 

7. Criar arquivo config/database.js para configurar a conexão com o banco:
```js

const { Sequelize } = require('sequelize');//arquivos que vc instalou dependencias
require('dotenv').config();//arquivos que vc instalou dependencias

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // ou 'mysql'
    port: process.env.DB_PORT
  }
);

module.exports = sequelize;

```

8. Criar arquivo para testar a conexao. Criar o arquivo index.js na pasta raiz.
```js
		const sequelize = require('./config/database');

		(async () => {
  			try {
    				await sequelize.authenticate();
    				console.log('Conexão com o banco de dados estabelecida com sucesso!');
    				await sequelize.sync(); // Cria as tabelas (use com cuidado em produção)
    				console.log('Modelos sincronizados com o banco de dados.');
  			} catch (error) {
    				console.error('Erro ao conectar ao banco de dados:', error);
  			}
		})();
```

9. Rodar index.js. Na pasta raiz, execute no terminal
```
	node index.js
```

Se tiver tudo certo, vai ser mostrados o resultado de uns SELECTs no terminal.
Em caso de erro, o problema principal deve ser as credenciais no banco e revisa.