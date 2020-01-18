module.exports = function(sequelize, DataTypes) {
var ShoppingCart = sequelize.define("Artists", {
    customerId: DataTypes.STRING,
    artworkId: DataTypes.STRING,
    quantity: DataTypes.STRING,
    subtotal: DataTypes.STRING
});
return ShoppingCart;
};