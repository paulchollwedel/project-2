module.exports = function(sequelize, DataTypes) {
var Customers = sequelize.define("Artists", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    creditCard: DataTypes.STRING,
    mailingAddress: DataTypes.TEXT
});
return Customers;
};