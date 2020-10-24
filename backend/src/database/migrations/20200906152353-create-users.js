'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('users', { 
       id: {
         type: Sequelize.INTEGER,
         allowNull:false,
         autoIncrement:true,
         primaryKey:true,
       }, 
       name:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
       },
       email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
       },
       city:{
        type: Sequelize.STRING,
        allowNull:false,
       },
       street:{
        type: Sequelize.STRING,
        allowNull:false, 
       },
       state:{
        type: Sequelize.STRING,
        allowNull:false, 
       },
       neighborhood:{
        type: Sequelize.STRING,
        allowNull:false, 
       },
       cep:{
        type: Sequelize.STRING,
        allowNull:false, 
       },
       number:{
        type: Sequelize.INTEGER,
        allowNull:false, 
       },
       phone:{
        type: Sequelize.STRING,
        allowNull:false,
       },
       password_hash:{
        type: Sequelize.STRING,
        allowNull:false,
       },
       provider:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
       },
       medic:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
       },
       crm:{
        type: Sequelize.STRING,
        
       },
       access_level:{
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 1,
       },
       created_at:{
        type: Sequelize.DATE,
        allowNull:false,
       },
       updated_at:{
        type: Sequelize.DATE,
        allowNull:false,
       }
       
    });
  },

  down: async (queryInterface) => {  
      await queryInterface.dropTable('users'); 
  }
};
