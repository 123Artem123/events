const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Event = require('../models/event')(sequelize, DataTypes);

class EventsRepository {
  create(event) {
    return Event.create(event);
  }
}

module.exports = EventsRepository;
