module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verifyToken: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        enum: ['user', 'admin'],
    },
  },
    {
      defaultScope: {
        attributes: { exclude: ['password', 'verifyToken'] },
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ['password', 'verifyToken'] },
        },
      },
    },
  );
  User.associate = function (models) {
  };
  User.sync({ force: false });
  return User;
};
