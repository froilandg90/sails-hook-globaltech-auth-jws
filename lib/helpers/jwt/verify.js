const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Check JWT',
  description: 'Allow to check the JWT.',
  inputs: {
    token: {
      type: 'string',
      description: 'JWT token.',
      required: true
    },
    callback: {
      type: 'ref',
      description: 'Callback.',
      required: true
    }
  },
  fn: async function (inputs) {
    jwt.verify(inputs.token, sails.config.custom.secret, (err, decoded) => {
      return inputs.callback(err, decoded);
    });
  }
};
