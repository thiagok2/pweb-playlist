import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('Canal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    data_criacao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genero_tema: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'canais',
    timestamps: false,
  });
