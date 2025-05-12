import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('Playlist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_canal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_filme: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assistido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tempo_assistido: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    nota_avaliacao_usuario: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
  }, {
    tableName: 'playlists',
    timestamps: false,
  });
