# Criando models 

Vamos agora criar a estrutura do projeto para o exemplo do playlist.
Veja como ele vai ficar a organização.

seu-projeto-playlist/
├── config/
│   └── database.js
├── models/
│   ├── Usuarios.js
│   ├── Filmes.js  /*Criar depois*/
│   ├── Canais.js /*Criar depois*/
│   ├── CanalFilmes.js /*Criar depois*/
│   ├── Playlists.js /*Criar depois*/
│   └── Comentarios.js /*Criar depois*/
├── .env
├── index.js
└── package.json

10.1 Vamos criar o arquivo Usuarios.js dentro da pasta models. Esse arquivo vai criar a classe e mapear as colunas usando 
os artifícios do sequelize:

models/Usuarios.js

```js
	import { DataTypes } from 'sequelize';
	import sequelize from '../config/database.js';

	const Usuarios = sequelize.define('Usuarios', {
  		id: {
    			type: DataTypes.INTEGER,
    			primaryKey: true,
    			autoIncrement: true,
  		},
  		login: {
    			type: DataTypes.STRING(50),
    			allowNull: false,
    			unique: true,
  		},
  		nome: {
    			type: DataTypes.STRING(100),
    			allowNull: false,
  		},
	}, {
  	tableName: 'usuario',
  	timestamps: false,
	});

	export default Usuarios;
```

11. Vamos atualizar o server para ele criar um registro de usuario.

server.js
```js
	import sequelize from './config/database.js';
	import Usuarios from './models/Usuarios.js'; // Apenas o modelo Usuarios

	(async () => {
  	try {
    		// Testar a conexão
   		 await sequelize.authenticate();
    		console.log('Conexão com o banco de dados estabelecida com sucesso!');

    		// Sincronizar apenas o modelo Usuarios
    		await sequelize.sync({ alter: true }); // Cria ou ajusta apenas a tabela 'usuarios'
    		console.log('Modelo Usuarios sincronizado com o banco de dados.');

    		// Teste: criar um usuário
    		const novoUsuario = await Usuarios.create({
      			login: 'teste123',
      			nome: 'Usuário Teste',
    		});

    		console.log('Usuário criado:', novoUsuario.toJSON());
  		} catch (error) {
   			console.error('Erro:', error);
 		}
		})();
```

Rodar o projeto
```sh
	node index.js
```
