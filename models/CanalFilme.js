import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('CanalFilme', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_canal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_filme: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'canal_filmes',
    timestamps: false,
  });
