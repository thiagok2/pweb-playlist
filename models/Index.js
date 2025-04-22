import sequelize from './../config/database.js';
import UsuarioModel from './Usuario.js';
import FilmeModel from './Filmes.js';
import CanalModel from './Canal.js';
import CanalFilmeModel from './CanalFilme.js';
import PlaylistModel from './Playlist.js';
import ComentarioModel from './Comentario.js';
import PlaylistFilmeModel from './PlaylistFilme.js';

const Usuario = UsuarioModel(sequelize);
const Filme = FilmeModel(sequelize);
const Canal = CanalModel(sequelize);
const CanalFilme = CanalFilmeModel(sequelize);
const Playlist = PlaylistModel(sequelize);
const PlaylistFilme = PlaylistFilmeModel(sequelize);
const Comentario = ComentarioModel(sequelize);

// RELACIONAMENTOS

// CanalFilmes
Canal.belongsToMany(Filme, {
  through: CanalFilme,
  foreignKey: 'id_canal',
});
Filme.belongsToMany(Canal, {
  through: CanalFilme,
  foreignKey: 'id_filme',
});

// Playlist
Usuario.hasMany(Playlist, { foreignKey: 'id_usuario' });
Playlist.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Canal.hasMany(Playlist, { foreignKey: 'id_canal' });
Playlist.belongsTo(Canal, { foreignKey: 'id_canal' });

Filme.hasMany(Playlist, { foreignKey: 'id_filme' });
Playlist.belongsTo(Filme, { foreignKey: 'id_filme' });

// Comentários
Usuario.hasMany(Comentario, { foreignKey: 'id_usuario' });
Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Filme.hasMany(Comentario, { foreignKey: 'id_filme' });
Comentario.belongsTo(Filme, { foreignKey: 'id_filme' });

Playlist.hasMany(PlaylistFilme, {foreignKey: 'id_playlist'});
PlaylistFilme.belongsTo(Playlist, {foreignKey:'id_playlist'});

export {
  Usuario,
  Filme,
  Canal,
  CanalFilme,
  Playlist,
  Comentario,
  PlaylistFilme
};