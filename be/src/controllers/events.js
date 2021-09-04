const EventsService = require('../services/Events');
const EventsRepository = require('../database/repositories/EventsRepository');

const eventsService = new EventsService(new EventsRepository());

exports.create = async (req, res, next) => {
  res.status(201).json(await eventsService.createEvent(req.body));
};
