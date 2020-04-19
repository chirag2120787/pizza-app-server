module.exports = (sequelize, DataTypes) => {
    var Order = sequelize.define('Order', {
        total: DataTypes.STRING,
        number: DataTypes.STRING,
        comments: DataTypes.STRING
    });

    Order.associate = function(models) {
        models.Order.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKeyConstraint: true,
            foreignKey: "userId"
        });
    };

    Order.associate = function(models) {
        models.Order.hasMany(models.OrderItem, { foreignKeyConstraint: true, foreignKey: 'orderId' });
    };


    return Order;
};