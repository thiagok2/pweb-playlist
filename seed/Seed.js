import sequelize from '../config/database.js'; // Ajuste o caminho se necessário

import {
  Usuario,
  Filme,
  Canal,
  CanalFilme,
  Playlist,
  Comentario,
} from '../models/Index.js';

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // cuidado: isso apaga e recria tudo

    // Usuários
    const usuarios = await Usuario.bulkCreate([
      { login: 'joaodasilva', nome: 'João da Silva' },
      { login: 'mariasantos', nome: 'Maria dos Santos' },
      { login: 'pedrocosta', nome: 'Pedro Costa' },
      { login: 'analuiza', nome: 'Ana Luiza' },
    ]);

    // Filmes
    const filmes = await Filme.bulkCreate([
      { titulo: 'A Origem', genero: 'Ficção Científica', duracao: 148, ano_lancamento: 2010, nota_avaliacao: 8.8 },
      { titulo: 'Vingadores: Ultimato', genero: 'Ação', duracao: 181, ano_lancamento: 2019, nota_avaliacao: 8.4 },
      { titulo: 'Titanic', genero: 'Romance', duracao: 195, ano_lancamento: 1997, nota_avaliacao: 7.8 },
      { titulo: 'O Rei Leão', genero: 'Animação', duracao: 88, ano_lancamento: 1994, nota_avaliacao: 8.5 },
      { titulo: 'Matrix', genero: 'Ficção Científica', duracao: 136, ano_lancamento: 1999, nota_avaliacao: 8.7 },
    ]);

    // Canais
    const canais = await Canal.bulkCreate([
      { nome: 'Canal Geek', data_criacao: '2015-06-15', genero_tema: 'Ficção Científica' },
      { nome: 'Cinema em Casa', data_criacao: '2018-09-20', genero_tema: 'Drama' },
      { nome: 'Ação Total', data_criacao: '2020-01-10', genero_tema: 'Ação' },
    ]);

    // Canal-Filmes
    await CanalFilme.bulkCreate([
      { id_canal: canais[0].id, id_filme: filmes[0].id },
      { id_canal: canais[0].id, id_filme: filmes[4].id },
      { id_canal: canais[1].id, id_filme: filmes[2].id },
      { id_canal: canais[1].id, id_filme: filmes[3].id },
      { id_canal: canais[2].id, id_filme: filmes[1].id },
    ]);

    // Playlists
    await Playlist.bulkCreate([
      { id_usuario: usuarios[0].id, id_canal: canais[0].id, id_filme: filmes[0].id, assistido: true, tempo_assistido: 120, nota_avaliacao_usuario: 5 },
      { id_usuario: usuarios[1].id, id_canal: canais[1].id, id_filme: filmes[2].id, assistido: true, tempo_assistido: 195, nota_avaliacao_usuario: 4 },
      { id_usuario: usuarios[2].id, id_canal: canais[2].id, id_filme: filmes[1].id, assistido: false, tempo_assistido: 0, nota_avaliacao_usuario: null },
      { id_usuario: usuarios[3].id, id_canal: canais[0].id, id_filme: filmes[4].id, assistido: true, tempo_assistido: 136, nota_avaliacao_usuario: 5 },
      { id_usuario: usuarios[0].id, id_canal: canais[1].id, id_filme: filmes[3].id, assistido: false, tempo_assistido: 30, nota_avaliacao_usuario: 3 },
    ]);

    // Comentários
    await Comentario.bulkCreate([
      { id_usuario: usuarios[0].id, id_filme: filmes[0].id, texto: 'Filme incrível!', data_comentario: new Date(), avaliacao: 9.0 },
      { id_usuario: usuarios[1].id, id_filme: filmes[2].id, texto: 'Muito emocionante.', data_comentario: new Date(), avaliacao: 8.0 },
      { id_usuario: usuarios[2].id, id_filme: filmes[1].id, texto: 'Cheio de ação!', data_comentario: new Date(), avaliacao: 8.5 },
      { id_usuario: usuarios[3].id, id_filme: filmes[4].id, texto: 'Revolucionário!', data_comentario: new Date(), avaliacao: 9.5 },
      { id_usuario: usuarios[0].id, id_filme: filmes[3].id, texto: 'Ótimo para crianças.', data_comentario: new Date(), avaliacao: 8.2 },
    ]);

    console.log('🌱 Banco populado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao popular o banco:', err);
    process.exit(1);
  }
};

seed();
