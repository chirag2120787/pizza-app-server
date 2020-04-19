'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING
    });

    User.associate = function(models) {
        models.User.hasMany(models.Order, { foreignKeyConstraint: true, foreignKey: "userId" });
    };

    return User;
};