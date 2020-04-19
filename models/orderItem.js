'use strict';
module.exports = (sequelize, DataTypes) => {
    var OrderItem = sequelize.define('OrderItem', {
        foodItem: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        price: DataTypes.STRING,
        itemId: DataTypes.INTEGER
    });

    OrderItem.associate = function(models) {
        models.OrderItem.belongsTo(models.Order, {
            onDelete: "CASCADE",
            foreignKey: "orderId",
            foreignKeyConstraint: true
        });
    };

    return OrderItem;
};