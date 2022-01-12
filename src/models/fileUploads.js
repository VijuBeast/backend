module.exports = (sequelize, DataTypes) => {
    const fileUploads = sequelize.define(
      'fileUploads',
      {
        fileName: {
          type: DataTypes.STRING,
        },
        fileLocation: {
          type: DataTypes.STRING,
        }
      }
    );
    
    return fileUploads;
  };