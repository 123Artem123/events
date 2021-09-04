const { validate } = require('express-validation');
const router = require('express').Router();
const { create: createController } = require('../controllers/events');
const { createEvent } = require('../validations/events');

router.route('/').post(validate(createEvent), createController);

module.exports = router;
