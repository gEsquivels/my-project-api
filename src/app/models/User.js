const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            password_reset_token: DataTypes.STRING,
            password_token_expires: DataTypes.DATE
        },{
            sequelize
        });
    };
};

module.exports = User;
