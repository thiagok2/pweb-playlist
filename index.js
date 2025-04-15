import sequelize from './config/database.js';
import Usuarios from './models/Usuario.js'; // Apenas o modelo Usuarios

	(async () => {
  	try {
    		// Testar a conexão
   		  await sequelize.authenticate();
    		console.log('database conexão ok!');
        console.log('Conectado ao banco:', sequelize.config.database, 'no host:', sequelize.config.host);

    		await sequelize.sync({alter: true});
    		console.log('update - modelos');

    		const novoUsuario = await Usuarios.create({
      			login: 'rebeca7.carolliny',
      			nome: '123456',
    		});


    		const usuarios = await Usuarios.findAll();
        console.log('Usuários no banco:', usuarios.map(u => u.toJSON()));
  		} catch (error) {
   			console.error('Erro:', error);
 		}
		})();
  