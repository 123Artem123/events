const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate() {}
  }
  Event.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      timestamps: false,
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
};
