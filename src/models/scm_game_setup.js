module.exports = (sequelize, DataTypes) => {
    const ScmGameSetup = sequelize.define('ScmGameSetup', {
        scm_game_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tmplt_id: {
            type: DataTypes.INTEGER,
        },
        game_rounds: {
            type: DataTypes.INTEGER,
        },
        game_round_duration: {
            type: DataTypes.INTEGER,
        },
        game_round_duration_unit: {
            type: DataTypes.STRING,
            defaultValue: 'mins'
        },
        game_player_list: {
            type: DataTypes.STRING,
        },
        game_start_datetime: {
            type: DataTypes.DATE,
        },
        game_sku_list: {
            type: DataTypes.STRING,
        },
        game_demand_data: {
            type: DataTypes.STRING,
        },
        game_initializations: {
            type: DataTypes.STRING,
        },
        game_status: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // 0 - schedule, 1 - active, 2 - completed, 3 - cancelled
            enum: [0, 1, 2, 3],
        },
    }, {
        timestamps: false,
    });
    ScmGameSetup.associate = function (models) { }
    ScmGameSetup.sync({ force: false })
    return ScmGameSetup;
}