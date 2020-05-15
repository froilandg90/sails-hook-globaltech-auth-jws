const authController = require("./lib/controllers/auth");

module.exports = function (sails) {

  // Declare a var that will act as a reference to this hook.
  var hook;

  return {

    initialize: function(cb) {
      // Assign this hook object to the `hook` var.
      // This allows us to add/modify values that users of the hook can retrieve.
      hook = this;
      if (!sails.hooks.hasOwnProperty("organics")) {
        return cb('El paquete sails-hook-organics no está instalado. Para solucionar el problema ejecute npm install sails-hook-organics --save');
      }
      if (!sails.config.auth) {
        return cb('La sección auth no se encontró en los settings.');
      } else if (!sails.config.auth.secret) {
        return cb('La variable de configuracion sails.config.auth.secret no está definida.');
      } else if (!sails.config.auth.expiresIn) {
        return cb('La variable de configuracion sails.config.auth.expiresIn no está definida.');
      }
      this.registerActions();
      return cb();
    },

    routes: {
      // before: {
      //   'POST /v1/auth/token': function (req, res, next) {
      //     res.set('application/json').status(200).send(authController.token());
      //     return next();
      //   }
      // },
      // after: {
      //   'POST /v1/auth/token': function (req, res, next) {
      //     return next();
      //   }
      // }
    },

    registerActions: function() {
      sails.registerAction(async (req, res) => {
        return await authController.token(sails, req, res);
      }, 'auth_token');
      sails.config.routes['POST /v1/auth/token'] = { action: 'auth_token' };
    }
  };
};
