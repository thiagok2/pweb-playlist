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
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'O campo precisa conter um e-mail válido.',
        },
      },
    },
  }, {
    tableName: 'usuarios',
    timestamps: false,
  });
