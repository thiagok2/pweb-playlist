import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'usuarios',
    timestamps: false,
  });
