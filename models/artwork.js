module.exports = function(sequelize, DataTypes) {
var Artwork = sequelize.define("Artwork", {
    title: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    price: DataTypes.STRING,
    inStock: DataTypes.STRING,
    buyerId: DataTypes.STRING
});

Artwork.associate = function(models) {
    Artwork.belongsTo(models.Artists, {
        foreignKey: {
            allowNull: false
        }
    });
};

return Artwork;
};