const { Model, DataTypes } = require('sequelize');

class Project extends Model {
   static init(sequelize){
      super.init({
         title: DataTypes.STRING,
         description: DataTypes.STRING,
         completion_date: DataTypes.DATE,
         status: DataTypes.INTEGER
      }, {
         sequelize,
      });
   };

   static associate(models){
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      this.hasMany(models.Task, {foreignKey: 'project_id', as: 'tasks'});
   };
}

module.exports = Project;
