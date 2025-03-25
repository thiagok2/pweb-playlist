import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

	const Usuarios = sequelize.define('Usuarios', {
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
      genero: {
        type: DataTypes.STRING(2),
        allowNull: true,
    },
	}, {
  	tableName: 'usuario',
  	timestamps: false,
	});

export default Usuarios;