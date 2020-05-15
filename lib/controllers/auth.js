const jwt = require('jsonwebtoken');
const errorService = require('../services/errorservice');

module.exports = {
    token: async function (sails, req, res) {
        // CHECK MODELS
        const MUser = sails.models.user;
        if (!MUser) return res.status(500).send(errorService(20001, { modelName: 'User' }));

        const email = req.body.email;
        const password = req.body.password;

        // await MUser.create({ email: email, password: password, fullName: 'Froilan' });

        const user = await MUser.findOne({ email: email });
        if (!user) return res.status(404).send(errorService(21001, { email: email }));

        try {
            await sails.helpers.passwords.checkPassword(password, user.password);
        } catch (e) {
            return res.status(409).send(errorService(21002));
        }
        // const userSer = await sails.helpers.user.obj(user.toJSON(), { lite: true });
        const token = jwt.sign(
            { data: user },
            sails.config.auth.secret,
            { expiresIn: sails.config.auth.expiresIn });

        const data = {
            auth: { access_token: token },
            user: user.toJSON()
        };
        return res.status(200).send(data);
    }
};
