module.exports = function(sequelize, DataTypes) {
var Artists = sequelize.define("Artists", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING
});
return Artists;
};
