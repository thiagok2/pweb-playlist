import sequelize from '../config/database.js'; // Ajuste o caminho se necessário

async function testSync() {
  try {
    // Sincroniza as tabelas com o banco de dados (caso não existam)
    await sequelize.sync({ force: true }); // use 'force: true' para garantir que as tabelas sejam recriadas
    console.log('conexâo ok!');
  } catch (error) {
    console.error('Erro ao sincronizar as tabelas:', error);
  } finally {
    sequelize.close();
  }
}

testSync();
