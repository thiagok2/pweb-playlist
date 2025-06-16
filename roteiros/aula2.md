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

export default (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    data_nascimento: {
      type: DataTypes.DATEONLY
    },
    email: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'usuarios',
    timestamps: false,
  });

  return Usuario;
};
```

11. Vamos atualizar o server para ele criar um registro de usuario.

server.js
```js
	import sequelize from './config/database.js';
	import Usuario from './models/Usuario.js'; // Apenas o modelo Usuarios

	(async () => {
  	try {
    		// Testar a conexão
   		 await sequelize.authenticate();
    		console.log('Conexão com o banco de dados estabelecida com sucesso!');

    		// Sincronizar apenas o modelo Usuarios
    		await sequelize.sync({ alter: true }); // Cria ou ajusta apenas a tabela 'usuarios'
    		console.log('Modelo Usuarios sincronizado com o banco de dados.');

    		// Teste: criar um usuário
    		const novoUsuario = await Usuario.create({
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
