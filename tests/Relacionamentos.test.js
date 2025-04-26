import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Relacionamentos', () => {
  it('Deve associar um canal a múltiplos filmes (muitos-para-muitos)', async () => {
    const canal = await db.Canal.create({
      nome: 'Canal Teste',
      data_criacao: '2023-01-01',
      genero_tema: 'Entretenimento',
    });

    const filme1 = await db.Filme.create({
      titulo: 'Filme 1',
      genero: 'Ação',
      duracao: 120,
      ano_lancamento: 2023,
      nota_avaliacao: 8.5,
    });

    const filme2 = await db.Filme.create({
      titulo: 'Filme 2',
      genero: 'Comédia',
      duracao: 90,
      ano_lancamento: 2022,
      nota_avaliacao: 7.0,
    });

    await canal.addFilmes([filme1, filme2]);

    const filmes = await canal.getFilmes();
    expect(filmes).to.have.lengthOf(2);
    expect(filmes.map(f => f.titulo)).to.include.members(['Filme 1', 'Filme 2']);
  });

  it('Deve associar um usuário a múltiplas playlists (um-para-muitos)', async () => {
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

    await db.Playlist.create({
      id_usuario: usuario.id,
      id_canal: canal.id,
      id_filme: filme.id,
      assistido: true,
    });

    await db.Playlist.create({
      id_usuario: usuario.id,
      id_canal: canal.id,
      id_filme: filme.id,
      assistido: false,
    });

    const playlists = await usuario.getPlaylists();
    expect(playlists).to.have.lengthOf(2);
    expect(playlists.map(p => p.assistido)).to.include.members([true, false]);
  });

  it('Deve associar um filme a múltiplos comentários (um-para-muitos)', async () => {
    const usuario = await db.Usuario.create({
      login: 'teste123',
      nome: 'Usuário Teste',
    });

    const filme = await db.Filme.create({
      titulo: 'Filme Teste',
      genero: 'Ação',
      duracao: 120,
      ano_lancamento: 2023,
      nota_avaliacao: 8.5,
    });

    await db.Comentario.create({
      id_usuario: usuario.id,
      id_filme: filme.id,
      texto: 'Ótimo filme!',
      avaliacao: 9.0,
    });

    await db.Comentario.create({
      id_usuario: usuario.id,
      id_filme: filme.id,
      texto: 'Muito bom!',
      avaliacao: 8.0,
    });

    const comentarios = await filme.getComentarios();
    expect(comentarios).to.have.lengthOf(2);
    expect(comentarios.map(c => c.texto)).to.include.members(['Ótimo filme!', 'Muito bom!']);
  });
});