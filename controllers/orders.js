var UserController = require('./users')
var models = require('../models')
var mailService = require('../services/mail')


const createOrder = (req, res) => {

    let orderData = {
        total: req.body.cartTotal,
        number: "ORD" + (req.body.userDetails.phone.toString() + Date.now().toString().substring(5, 10)).substring(10, 20),
        comments: req.body.orderComments || ''
    }

    UserController.createUser(req, res).then((createdUser) => {
        user = createdUser;
        orderData['userId'] = user.id
        return models.Order.create(orderData)

    }).then((orderData) => {
        let orderItemEntries = [];
        orderDetails = orderData;

        req.body.cartData.forEach(cartItem => {
            const orderItem = {
                quantity: cartItem.quantity,
                foodItem: cartItem.menuItem.itemName,
                price: cartItem.menuItem.itemPrice,
                itemId: cartItem.menuItem.id,
                orderId: orderData.id
            }
            orderItemEntries.push(models.OrderItem.create(orderItem))
        });
        return Promise.all(orderItemEntries)
    }).then(async(addedOrder) => {
        await mailService.sendEmail(user, orderDetails);
        console.log('after mail call')
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            message: `Order completed with order number: ${orderDetails.number}`
        })

    }).catch(error => {
        return res.status(500).json({ error: error.message })
    })
};

module.exports = { createOrder }