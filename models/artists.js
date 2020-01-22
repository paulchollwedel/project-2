module.exports = function(sequelize, DataTypes) {
var Artists = sequelize.define("Artists", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING
});

Artists.associate = function(models) {
    Artists.hasMany(models.Artwork, {
        onDelete: "cascade"
        });
};

return Artists;
};
