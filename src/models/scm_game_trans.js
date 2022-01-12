module.exports = (sequelize, DataTypes) => {
    const ScmGameTrans = sequelize.define('ScmGameTrans', {
        game_trans_id: {
            primaryKey: true,
            type: DataTypes.STRING,
        },
        scm_game_id: {
            type: DataTypes.INTEGER,
        },
        round_number: {
            type: DataTypes.INTEGER,
        },
        player_id: {
            type: DataTypes.INTEGER,
        },
        demand_skus: {
            type: DataTypes.STRING,
        },
        purchase_skus: {
            type: DataTypes.STRING,
        },
        bank_bal: {
            type: DataTypes.INTEGER,
        },
        date_time_stamp: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1, // 0 - schedule, 1 - active, 2 - completed, 3 - cancelled
            enum: [0, 1, 2, 3]
        }
    }, {
        timestamps: false,
    });
    ScmGameTrans.associate = function (models) {}
    ScmGameTrans.sync({ force: false })
    return ScmGameTrans;
}