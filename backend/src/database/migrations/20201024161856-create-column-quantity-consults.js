'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.addColumn('users','quantity_consults', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    });
     
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.removeColumn('users','quantity_consults');
     
  }
};
