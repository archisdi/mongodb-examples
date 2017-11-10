const Driver = require('../model/driver');


module.exports = {

  create(req, res){
    let driverProps = req.body;

    Driver.create(driverProps)
    .then(driver => res.send(driver))

  }


}
