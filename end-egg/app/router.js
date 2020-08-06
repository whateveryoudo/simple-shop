'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user } = controller;
  router.post('/user/login', user.auth.login);
};
