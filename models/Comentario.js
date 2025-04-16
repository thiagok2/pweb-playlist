import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('Comentario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_filme: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data_comentario: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    avaliacao: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0,
        max: 10,
      },
    },
  }, {
    tableName: 'comentarios',
    timestamps: false,
  });
