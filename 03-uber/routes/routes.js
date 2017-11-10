const DriverController = require('../controller/DriverController');

module.exports = (app) => {
  app.get('/api', (req, res) => res.send({message:'hello world'}));
  app.get('/api/driver', DriverController.index);
  app.get('/api/driver/:id', DriverController.show)
  app.post('/api/driver', DriverController.create)
  app.put('/api/driver/:id', DriverController.update)
  app.delete('/api/driver/:id', DriverController.delete)

}
