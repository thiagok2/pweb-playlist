import sequelize from './config/database.js';
import Usuarios from './models/Usuario.js'; // Apenas o modelo Usuarios

	(async () => {
  	try {
    		// Testar a conexão
   		 await sequelize.authenticate();
    		console.log('Conexão com o banco de dados estabelecida com sucesso!');

    		// Sincronizar apenas o modelo Usuarios
    		await sequelize.sync({ alter: true }); // Cria ou ajusta apenas a tabela 'usuarios'
    		console.log('Modelo Usuarios sincronizado com o banco de dados.');

    		// Teste: criar um usuário
    		// const novoUsuario = await Usuarios.create({
      	// 		login: 'teste123',
      	// 		nome: 'Usuário Teste',
    		// });

    		// console.log('Usuário criado:', novoUsuario.toJSON());
  		} catch (error) {
   			console.error('Erro:', error);
 		}
		})();
  