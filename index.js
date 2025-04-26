import sequelize from './config/database.js';
import UsuarioModel from './models/Usuario.js';

// Inicializa o modelo com a instância do Sequelize
const Usuario = UsuarioModel(sequelize);

(async () => {
  try {
    // Testar a conexão
    await sequelize.authenticate();
    console.log('Database conexão ok!');
    console.log(
      'Conectado ao banco:',
      sequelize.config.database,
      'no host:',
      sequelize.config.host
    );

    // Sincroniza os modelos
    await sequelize.sync({ alter: true });
    console.log('Update - modelos');

    // Cria um novo usuário
    const novoUsuario = await Usuario.create({
      login: 'rebeca12.carolliny',
      nome: 'Rebeca Carolliny',
    });

    // Busca todos os usuários
    const usuarios = await Usuario.findAll();
    console.log('Usuários no banco:', usuarios.map((u) => u.toJSON()));
  } catch (error) {
    console.error('Erro:', error);
  }
})();