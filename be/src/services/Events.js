class EventsService {
  constructor(repository) {
    this.repository = repository;
  }

  createEvent(event) {
    return this.repository.create(event);
  }
}

module.exports = EventsService;
