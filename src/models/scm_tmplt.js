module.exports = (sequelize, DataTypes) => {
  const ScmTmplt = sequelize.define('ScmTmplt', {
    tmplt_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    tmplt_name: {
      type: DataTypes.STRING,
    },
    tmplt_company_name: {
      type: DataTypes.STRING,
    },
    tmplt_industry: {
      type: DataTypes.STRING,
    },
    tmplt_desc: {
      type: DataTypes.STRING,
    },
    tmplt_objective: {
      type: DataTypes.STRING,
    },
    tmplt_function: {
      type: DataTypes.STRING,
    },
    tmplt_remarks: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  });
  ScmTmplt.associate = (models) => { };
  ScmTmplt.sync({ force: false });
  return ScmTmplt;
};