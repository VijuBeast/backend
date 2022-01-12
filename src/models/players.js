module.exports = (sequelize, DataTypes) => {
    const gamePlayer = sequelize.define("gamePlayer", {
        player_id: {
            type: DataTypes.INTEGER,
        },
        player_name: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false,
    });
    gamePlayer.associate = (models) => {};
    gamePlayer.sync({force: false});
    return gamePlayer;
};