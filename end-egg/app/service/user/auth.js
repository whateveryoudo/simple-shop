const Service = require('egg').Service
const md5 = require('md5');
class AdminService extends Service {
    /*
     *@functionName: 根据用户名密码获取管理员信息
     *@params1: {String} userName 用户名
     *@params2: {String} password 密码
    */
   async getAdminByLogin (userName, password){
       const { app } = this;
       return await app.model.User.Admin.get({ userName, password: md5(password) })
   };
}