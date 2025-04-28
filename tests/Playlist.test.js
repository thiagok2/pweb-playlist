import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Playlist Model', () => {
  it('Deve criar uma playlist com dados válidos', async () => {
    const usuario = await db.Usuario.create({
      login: 'teste123',
      nome: 'Usuário Teste',
    });

    const canal = await db.Canal.create({
      nome: 'Canal Teste',
      data_criacao: '2023-01-01',
      genero_tema: 'Entretenimento',
    });

    const filme = await db.Filme.create({
      titulo: 'Filme Teste',
      genero: 'Ação',
      duracao: 120,
      ano_lancamento: 2023,
      nota_avaliacao: 8.5,
    });

    const playlist = await db.Playlist.create({
      id_usuario: usuario.id,
      id_canal: canal.id,
      id_filme: filme.id,
      assistido: true,
      tempo_assistido: 60,
      nota_avaliacao_usuario: 4,
    });

    expect(playlist).to.have.property('id');
    expect(playlist.id_usuario).to.equal(usuario.id);
    expect(playlist.id_canal).to.equal(canal.id);
    expect(playlist.id_filme).to.equal(filme.id);
    expect(playlist.assistido).to.be.true;
    expect(playlist.nota_avaliacao_usuario).to.equal(4);
  });

  it('Não deve criar uma playlist sem id_usuario', async () => {
    const canal = await db.Canal.create({
      nome: 'Canal Teste',
      data_criacao: '2023-01-01',
      genero_tema: 'Entretenimento',
    });

    const filme = await db.Filme.create({
      titulo: 'Filme Teste',
      genero: 'Ação',
      duracao: 120,
      ano_lancamento: 2023,
      nota_avaliacao: 8.5,
    });

    try {
      await db.Playlist.create({
        id_canal: canal.id,
        id_filme: filme.id,
      });
      expect.fail('Deveria ter lançado um erro de validação');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Não deve criar uma playlist com nota_avaliacao_usuario fora do intervalo', async () => {
    const usuario = await db.Usuario.create({
      login: 'teste123',
      nome: 'Usuário Teste',
    });

    const canal = await db.Canal.create({
      nome: 'Canal Teste',
      data_criacao: '2023-01-01',
      genero_tema: 'Entretenimento',
    });

    const filme = await db.Filme.create({
      titulo: 'Filme Teste',
      genero: 'Ação',
      duracao: 120,
      ano_lancamento: 2023,
      nota_avaliacao: 8.5,
    });

    try {
      await db.Playlist.create({
        id_usuario: usuario.id,
        id_canal: canal.id,
        id_filme: filme.id,
        nota_avaliacao_usuario: 6,
      });
      expect.fail('Deveria ter lançado um erro de validação');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });
});