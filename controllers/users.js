var models = require('../models')

const createUser = async(req, res) => {

    let userData;

    if (req.body.userDetails) {
        userData = req.body.userDetails;
    } else {
        userData = req.body;
    }

    try {
        if (req.body.userDetails) {
            const user = await models.User.create(userData);
            return user;
        } else {
            return await models.User.create(userData).then((createdUser) => {
                res.send(createdUser);
            })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

module.exports = { createUser }