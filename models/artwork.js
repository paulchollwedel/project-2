module.exports = function(sequelize, DataTypes) {
var Artwork = sequelize.define("Artists", {
    artistId: DataTypes.STRING,
    title: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    price: DataTypes.STRING,
    inStock: DataTypes.STRING,
    buyerId: DataTypes.STRING
});
return Artwork;
};