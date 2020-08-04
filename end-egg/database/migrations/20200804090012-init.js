'use strict';
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
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
        const schema = require(tempPath)({ Sequelize }); // 获取构建对象
        await queryInterface.createTable(schemaName.replace('.js', ''), schema); // 按照文件名生成表名
      }

      // 添加管理员
      await queryInterface.bulkInsert('admin', [{
        uuid: uuidv1(),
        lastModifiedTime: new Date(),
        lastModifierName: 'system',
        lastModifierId: 'system',
        createdTime: new Date(),
        creatorName: 'system',
        creatorId: 'system',
        name: '管理员',
        enableStatus: 'enabled',
        userType: 'admin',
        userName: 'admin', // 账号：admin
        password: '21232f297a57a5a743894a0e4a801fc3', // 密码：admin
        version: 0,
      }]);
    } catch (e) {
      console.log(e);
    }
  },

  down: async queryInterface => {
    // 删除所有表
    await queryInterface.dropAllTables();
  }
};
