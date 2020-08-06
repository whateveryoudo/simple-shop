const Controller = require('../../core/base_controller');

class UserAuthController extends Controller{
    async login () {
        const { ctx, app } = this;
        const { userName, userType, password } = ctx.request.body;
        let user = {};
        console.log(userName, userType, password);
        if (userType === 'admin') {
            user = await ctx.service.user.auth.getAdminByLogin(userName, password);
        }
        console.log(user);
    }
}

module.exports = UserAuthController;