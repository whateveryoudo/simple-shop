// 商户表
const uuidv1 = require('uuid/v1');

module.exports = app => {
    const { STRING, BIGINT, DATE, ENUM } = app.Sequelize;
    const uuid = uuidv1();

    return {
        uuid: {
            type: STRING(38),
            allowNull: false,
            primaryKey: true,
            defaultValue: uuid
        },
        lastModifiedTime: {
            type: DATE,
            allowNull: false
        },
        lastModifierName: {
            type: STRING(76),
            allowNull: false
        },
        lastModifierId: {
            type: STRING(38),
            allowNull: false
        },
        createTime: {
            type: DATE,
            allowNull: false
        },
        createName: {
            type: STRING(76),
            allowNull: false
        },
        // enabled 启用，disabled禁用
        enableStatus: {
            type: ENUM('enabled', 'disabled'),
            allowNull: false,
        },
        userType: {
            type: ENUM('merchant', 'employee'),
            allowNull: false
        },
        userName: {
            type: STRING(12),
            allowNull: false
        },
        password: {
            type: STRING(100),
            allowNull: false
        },
        remark: STRING(255),
        address: STRING(255),
        servicePhone: STRING(12),
        orgName: STRING(76),
        orgUuid: {
            type: STRING(38),
            defaultValue: uuid
        },
        linkPhone: STRING(255),
        linkMan: STRING(76),
        appId: STRING(38),
        mchKey: STRING(38),
        mchId: STRING(38),
        appSecret: STRING(38),
        version: {
            type: BIGINT,
            defaultValue: 0
        }
    }
}