module.exports = (sequelize, DataTypes) => {
  const SkuDemand = sequelize.define("skudemand", {
    sku1: {
      type: DataTypes.INTEGER,
    },
    sku2: {
      type: DataTypes.INTEGER,
    },
    sku3: {
      type: DataTypes.INTEGER,
    },
    sku4: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
  });
  SkuDemand.sync({ force: false });
  return SkuDemand;
};