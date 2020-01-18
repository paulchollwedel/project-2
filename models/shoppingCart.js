module.exports = function(sequelize, DataTypes) {
var ShoppingCart = sequelize.define("ShoppingCart", {
    customerId: DataTypes.STRING,
    artworkId: DataTypes.STRING,
    quantity: DataTypes.STRING,
    subtotal: DataTypes.STRING
});
return ShoppingCart;
};