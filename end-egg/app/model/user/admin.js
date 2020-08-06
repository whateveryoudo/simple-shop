module.exports = app => {
    const { model } = app;
    const adminSchema = require('../../schema/admin')
    const Admin = model.define('admin', adminSchema);
    // 根据用户名密码查找用户
    Admin.get = async (condition) => {
        return await Admin.findOne({
            where: condition
        })
    }
    return Admin
}