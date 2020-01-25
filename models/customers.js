module.exports = function(sequelize, DataTypes) {
var Customers = sequelize.define("Customers", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    creditCard: DataTypes.STRING,
    mailingAddress: DataTypes.TEXT
});
return Customers;
};