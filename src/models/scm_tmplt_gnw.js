module.exports = (sequelize, DataTypes) => {
    const ScmTmpltGnw = sequelize.define('ScmTmpltGnw', {
        tmplt_id: {
            type: DataTypes.INTEGER,
        },
        gnw_element_id: {
            type: DataTypes.STRING,
        },
        gnw_element_category: {
            type: DataTypes.STRING,
        },
        gnw_element_name: {
            type: DataTypes.STRING,
        },
        gnw_element_level: {
            type: DataTypes.INTEGER,
        },
        gnw_element_location: {
            type: DataTypes.STRING,
        },
        gnw_element_owner_name: {
            type: DataTypes.STRING,
        },
        gnw_element_scm_side: {
            type: DataTypes.STRING,
        },
        gnw_element_mathsym: {
            type: DataTypes.STRING,
        },
        gnw_element_cost_unit: {
            type: DataTypes.STRING,
        },
        gnw_element_cost: {
            type: DataTypes.DECIMAL,
        },
        gnw_element_links: {
            type: DataTypes.STRING,
        }
    }, {
        timpeStamps: false,
    });
    ScmTmpltGnw.assoicate = (models) => {};
    ScmTmpltGnw.sync({ force: false });
    return ScmTmpltGnw;
}