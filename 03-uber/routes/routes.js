const DriverController = require('../controller/DriverController');

module.exports = (app) => {
  app.get('/api', (req, res) => res.send({message:'hello world'}));
  app.post('/api/driver', DriverController.create)
}
