const Driver = require('../model/driver');


module.exports = {

  show(req, res, next){
    let id = req.params.id;
    Driver.findOne({_id:id})
    .then(driver => {
      res.send(driver);
    })
    .catch(err => next(err))

  },

  create(req, res, next){
    let driverProps = req.body;

    Driver.create(driverProps)
    .then(driver => res.send(driver))
    .catch(err => next(err))

  },

  update(req, res, next){
    let driverProps = req.body;
    let id = req.params.id;

    Driver.findByIdAndUpdate(id, driverProps)
    .then(() => Driver.findById(id))
    .then((driver) => res.send(driver))
    .catch(err => next(err))
  },

  delete(req, res, next){
    let id = req.params.id;

    Driver.findByIdAndRemove(id)
    .then((driver) => res.status(204).send(driver))
    .catch(err => next(err))
  },

  index(req, res, next){
    const { lng, lat } = req.query;

    Driver.geoNear({ type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },{ spherical:true, maxDistance:200000 } )
    .then(drivers => res.send(drivers))
    .catch(err => next(err))
  }
}
