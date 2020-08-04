'use strict';
const fs = require('fs');
const path = require('path');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // 初始化数据库
    try {
      const allSchemas = fs.readdirSync(path.join('./', 'app/schema'));
      for (const schemaName of allSchemas) {
        const tempPath = path.join('../../app/schema/', schemaName);
        const schema = require(tempPath)({Sequelize}); // 获取构建对象
        await queryInterface.createTable(schemaName.replace('.js', ''), schema); // 按照文件名生成表名
      }
      
    }catch(e) {

    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
