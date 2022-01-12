module.exports = (sequelize, DataTypes) => {
    const ScmSkuMaster = sequelize.define('ScmSkuMaster', {
        tmplt_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allownull: false,
        },
        sku_id: {
            type: DataTypes.STRING,
            allownull: false,
        },
        sku_category: {
            type: DataTypes.STRING,
            allownull: false,
        },
        sku_name: {
            type: DataTypes.STRING,
            allownull: false,
        },
        sku_unit: {
            type: DataTypes.STRING,
            allownull: false,
        },
        sku_scm_side: {
            type: DataTypes.STRING,
            allownull: false,
        },
        sku_purchase_price: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        sku_sale_price: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        sku_order_lead_time: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        sku_orderleadtime_unit: {
            type: DataTypes.STRING,
            allownull: false,
        },
        sku_reorder_level: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        sku_demand_history: {
            type: DataTypes.STRING,
            allownull: false,
        },
        sku_demand_dist_type: {
            type: DataTypes.STRING,
            allownull: false,
        },
        sku_payment_realize_time: {
            type: DataTypes.STRING,
            allownull: false,
        }
    });
    ScmSkuMaster.associate = function (models) { }
    ScmSkuMaster.sync({ force: false });
    return ScmSkuMaster;
}